import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsByUserThunk } from "../../store/slices/spotsSlice";
import { Spinner } from "../../components/ui";
import styles from "./MyRecharges.module.css";
import { RiFlashlightLine, RiMapPinLine, RiCalendarLine } from "react-icons/ri";

export default function MyRecharges() {
    const dispatch = useDispatch();
    const { user }  = useSelector(s => s.users);
    const { spotsByUser, loading } = useSelector(s => s.spots);

    useEffect(() => {
        if (user?._id) dispatch(getSpotsByUserThunk(user._id));
    }, [user?._id]);

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.title}>Mis recargas</h2>
                <span className={styles.count}>{spotsByUser.length} recargas</span>
            </div>

            {spotsByUser.length === 0 ? (
                <div className={styles.empty}>
                    <RiFlashlightLine size={40} className={styles.emptyIcon} />
                    <p>Aún no has realizado ninguna recarga.</p>
                    <a href="/mapa" className="btn btn-primary btn-sm">
                        Buscar estaciones
                    </a>
                </div>
            ) : (
                <div className={styles.grid}>
                    {spotsByUser.map((item, i) => (
                        <div key={item._id || item.spot?._id || i} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <RiFlashlightLine size={18} />
                                </div>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardType}>
                                        {item.spot?.type || "Recarga"}
                                    </span>
                                    <span className={styles.cardPower}>
                                        {item.spot?.power || "—"}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.cardRow}>
                                    <RiCalendarLine size={13} />
                                    <span>{item.date || "—"}</span>
                                </div>
                                {item.station && (
                                    <div className={styles.cardRow}>
                                        <RiMapPinLine size={13} />
                                        <span className="truncate">Estación</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
