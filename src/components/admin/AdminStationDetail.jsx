import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    getStationByIdThunk,
    updateStationThunk,
    deleteStationThunk,
} from "../../store/slices/stationsSlice";
import { getSpotsByStationThunk } from "../../store/slices/spotsSlice";
import { Spinner, StateBadge, Toast, ConfirmDialog } from "../ui";
import { useToast, useConfirm } from "../../hooks";
import styles from "./AdminStationDetail.module.css";
import {
    RiMapPinLine, RiTimeLine, RiHeartLine,
    RiFlashlightLine, RiArrowLeftLine, RiDeleteBin6Line, RiEdit2Line,
} from "react-icons/ri";

const CONNECTOR_IMGS = {
    Schuko:  "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-schuko_vov9iu.png",
    Type2:   "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-type2_o9hlej.png",
    CCS2:    "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-ccs2_ziy7mo.png",
    CHAdeMO: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-chademo_amtfq9.png",
};

export default function AdminStationDetail() {
    const { id }     = useParams();
    const dispatch   = useDispatch();
    const navigate   = useNavigate();
    const { stationSelected, loading } = useSelector(s => s.stations);
    const { spotsByStation } = useSelector(s => s.spots);
    const { toast, show }    = useToast();
    const { pending, confirm, handleConfirm, handleCancel } = useConfirm();
    const [editing, setEditing] = useState(false);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        dispatch(getStationByIdThunk(id));
        dispatch(getSpotsByStationThunk(id));
    }, [id]);

    const onUpdate = async (data) => {
        const res = await dispatch(updateStationThunk({ id, data }));
        if (res.meta.requestStatus === "fulfilled") {
            show("Estación actualizada");
            setEditing(false);
        }
    };

    const handleDelete = async () => {
        const ok = await confirm("¿Eliminar esta estación permanentemente?");
        if (!ok) return;
        await dispatch(deleteStationThunk(id));
        navigate("/usuario/estaciones");
    };

    if (loading || !stationSelected) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <ConfirmDialog message={pending?.message} onConfirm={handleConfirm} onCancel={handleCancel} />

            {/* Header */}
            <div className={styles.header}>
                <Link to="/usuario/estaciones" className={styles.backBtn}>
                    <RiArrowLeftLine size={16} /> Estaciones
                </Link>
                <div className={styles.headerActions}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(e => !e)}>
                        <RiEdit2Line size={14} /> {editing ? "Cancelar" : "Editar"}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        <RiDeleteBin6Line size={14} /> Eliminar
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
                <h2 className={styles.address}>{stationSelected.address}</h2>
                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <RiMapPinLine size={14} />
                        <a
                            href={`https://maps.google.com/?q=${stationSelected.coordinates?.lat},${stationSelected.coordinates?.lng}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-primary"
                        >
                            Ver en Google Maps
                        </a>
                    </span>
                    <span className={styles.metaItem}><RiTimeLine size={14} /> {stationSelected.schedule}</span>
                    <span className={styles.metaItem}><RiHeartLine size={14} /> {stationSelected.likes} likes</span>
                    <span className={styles.metaItem}><RiFlashlightLine size={14} /> {stationSelected.spots?.length} puestos</span>
                </div>
            </div>

            {/* Edit form */}
            {editing && (
                <form onSubmit={handleSubmit(onUpdate)} className={styles.editForm}>
                    <div className="field" style={{ maxWidth: 260 }}>
                        <label className="label">Horario</label>
                        <select className="input" {...register("schedule")} defaultValue={stationSelected.schedule}>
                            <option value="10:00 - 22:00">10:00 - 22:00</option>
                            <option value="24 Horas">24 Horas</option>
                            <option value="Cerrada">Cerrada</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                </form>
            )}

            <hr className="divider" />

            {/* Spots grid */}
            <h3 className={styles.spotsTitle}>Puestos de carga ({spotsByStation.length})</h3>
            <div className={styles.spotGrid}>
                {spotsByStation.map(spot => (
                    <div key={spot._id} className={styles.spotCard}>
                        <div className={styles.spotImgWrap}>
                            <img
                                src={CONNECTOR_IMGS[spot.type] || CONNECTOR_IMGS.Type2}
                                alt={spot.type}
                                className={styles.spotImg}
                            />
                        </div>
                        <div className={styles.spotBody}>
                            <div className={styles.spotRow}>
                                <span className={styles.spotLabel}>Tipo</span>
                                <span className={styles.spotValue}>{spot.type}</span>
                            </div>
                            <div className={styles.spotRow}>
                                <span className={styles.spotLabel}>Potencia</span>
                                <span className={styles.spotValue}>{spot.power}</span>
                            </div>
                            <div className={styles.spotRow}>
                                <span className={styles.spotLabel}>Tarifa</span>
                                <span className={styles.spotValue}>{spot.rate} €/kWh</span>
                            </div>
                        </div>
                        <div className={styles.spotFooter}>
                            <StateBadge state={spot.state} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
