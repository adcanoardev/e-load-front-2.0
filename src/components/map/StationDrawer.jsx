import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateSpotStateThunk } from "../../store/slices/spotsSlice";
import { createCommentThunk, getCommentsByStationThunk } from "../../store/slices/otherSlices";
import { api } from "../../api/client";
import { StateBadge, Avatar } from "../ui";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";
import styles from "./StationDrawer.module.css";
import {
    RiMapPinLine, RiTimeLine, RiHeartLine,
    RiFlashlightLine, RiChat3Line, RiCloseLine,
} from "react-icons/ri";

moment.locale("es");

// ─── SpotCard ──────────────────────────────────────────────────────────────────
function SpotCard({ spot }) {
    const dispatch = useDispatch();
    const { user } = useSelector(s => s.users);
    const { spotToCharge } = useSelector(s => s.spots);
    const [progress, setProgress] = useState(0);
    const [charging, setCharging] = useState(false);
    const [done, setDone] = useState(false);

    const isOccupiedByMe = spotToCharge?._id === spot._id;
    const isDisabled     = spotToCharge && !isOccupiedByMe;

    const handleCharge = async () => {
        if (!user || charging || done || isDisabled || spot.state === "Ocupado") return;
        await dispatch(updateSpotStateThunk({ id: spot._id, state: "Ocupado" }));
        await api.patch(`users/${user._id}`, {
            $push: {
                spots: { date: new Date().toLocaleDateString(), spot: spot._id, station: spot.station },
            },
        });
        await api.patch(`users/${user._id}`, { points: (user.points || 0) + 100 });

        setCharging(true);
        let val = 0;
        const interval = setInterval(() => {
            val += 5;
            setProgress(val);
            if (val >= 100) { clearInterval(interval); setCharging(false); setDone(true); }
        }, 600);
    };

    const handleDisconnect = async () => {
        await dispatch(updateSpotStateThunk({ id: spot._id, state: "Libre" }));
        setProgress(0); setDone(false);
    };

    const CONNECTOR_IMGS = {
        Schuko:  "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-schuko_vov9iu.png",
        Type2:   "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-type2_o9hlej.png",
        CCS2:    "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-ccs2_ziy7mo.png",
        CHAdeMO: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-chademo_amtfq9.png",
    };

    return (
        <div className={styles.spotCard}>
            <div className={styles.spotHeader}>
                <img src={CONNECTOR_IMGS[spot.type] || CONNECTOR_IMGS.Type2} alt={spot.type} className={styles.connectorImg} />
                <div className={styles.spotInfo}>
                    <span className={styles.spotType}>{spot.type}</span>
                    <span className={styles.spotPower}>{spot.power}</span>
                    <span className={styles.spotRate}>{spot.rate} €/kWh</span>
                </div>
                <StateBadge state={done ? "Ocupado" : spot.state} />
            </div>

            {/* Barra de carga */}
            {(charging || done) && (
                <div className={styles.progressWrap}>
                    <div
                        className={`${styles.progressBar} ${done ? styles.progressDone : ""}`}
                        style={{ width: `${progress}%` }}
                    />
                    <span className={styles.progressLabel}>{progress}%</span>
                </div>
            )}

            {user && (
                <div className={styles.spotActions}>
                    {done ? (
                        <button className="btn btn-ghost btn-sm" onClick={handleDisconnect}>
                            Desconectar
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleCharge}
                            disabled={charging || isDisabled || spot.state === "Ocupado"}
                        >
                            {charging ? `Cargando ${progress}%` : "Iniciar carga"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── StationDrawer ─────────────────────────────────────────────────────────────
export default function StationDrawer({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { stationSelected } = useSelector(s => s.stations);
    const { spotsByStation }  = useSelector(s => s.spots);
    const { commentsByStation } = useSelector(s => s.comments);
    const { user } = useSelector(s => s.users);
    const [tab, setTab] = useState("spots");
    const { register, handleSubmit, reset } = useForm();

    const handleTabChange = async (t) => {
        setTab(t);
        if (t === "comments" && stationSelected) {
            dispatch(getCommentsByStationThunk(stationSelected._id));
        }
    };

    const onComment = async (data) => {
        await dispatch(createCommentThunk({ body: data.body, station: stationSelected._id }));
        reset();
    };

    if (!isOpen || !stationSelected) return null;

    return (
        <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
            <div className={styles.drawerHeader}>
                <div className={styles.drawerTitle}>
                    <RiMapPinLine size={16} className="text-primary" />
                    <span>{stationSelected.address}</span>
                </div>
                <button className={styles.closeBtn} onClick={onClose}>
                    <RiCloseLine size={20} />
                </button>
            </div>

            {/* Meta */}
            <div className={styles.meta}>
                <span className={styles.metaItem}><RiTimeLine size={14} /> {stationSelected.schedule}</span>
                <span className={styles.metaItem}><RiHeartLine size={14} /> {stationSelected.likes}</span>
                <span className={styles.metaItem}><RiFlashlightLine size={14} /> {stationSelected.spots?.length} puestos</span>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${tab === "spots" ? styles.tabActive : ""}`}
                    onClick={() => handleTabChange("spots")}
                >
                    <RiFlashlightLine size={15} /> Puestos
                </button>
                <button
                    className={`${styles.tab} ${tab === "comments" ? styles.tabActive : ""}`}
                    onClick={() => handleTabChange("comments")}
                >
                    <RiChat3Line size={15} /> Comentarios
                </button>
            </div>

            <div className={styles.drawerBody}>
                {tab === "spots" && (
                    <div className={styles.spotList}>
                        {!user && (
                            <p className={styles.loginHint}>Inicia sesión para usar los puestos de carga</p>
                        )}
                        {spotsByStation.map(spot => <SpotCard key={spot._id} spot={spot} />)}
                    </div>
                )}

                {tab === "comments" && (
                    <div className={styles.commentSection}>
                        {user && (
                            <form onSubmit={handleSubmit(onComment)} className={styles.commentForm}>
                                <textarea
                                    className={`input ${styles.commentInput}`}
                                    {...register("body", { required: true })}
                                    placeholder="Escribe un comentario..."
                                    rows={3}
                                />
                                <button type="submit" className="btn btn-primary btn-sm">Publicar</button>
                            </form>
                        )}
                        <div className={styles.commentList}>
                            {commentsByStation.map(c => (
                                <div key={c._id} className={styles.commentCard}>
                                    <div className={styles.commentHeader}>
                                        <Avatar src={c.user?.image} name={c.user?.username} size={32} />
                                        <div>
                                            <span className={styles.commentUser}>{c.user?.username}</span>
                                            <span className={styles.commentDate}>{moment(c.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                    <p className={styles.commentBody}>{c.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
StationDrawer.propTypes = { isOpen: PropTypes.bool, onClose: PropTypes.func };
SpotCard.propTypes = { spot: PropTypes.object };
