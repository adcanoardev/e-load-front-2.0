import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    getAllStationsAdminThunk,
    deleteStationThunk,
    createStationThunk,
    updateStationThunk,
    getStationByIdThunk,
} from "../../store/slices/stationsSlice";
import {
    getAllSpotsThunk,
    getSpotsByStationThunk,
    createSpotThunk,
    updateSpotThunk,
    deleteSpotThunk,
} from "../../store/slices/spotsSlice";
import { getAllUsersThunk } from "../../store/slices/usersSlice";
import { getAllCommentsThunk, deleteCommentThunk } from "../../store/slices/otherSlices";
import { Spinner, StateBadge, Toast, ConfirmDialog } from "../ui";
import { useToast, useConfirm } from "../../hooks";
import styles from "./Admin.module.css";
import { RiAddLine, RiDeleteBin6Line, RiEdit2Line, RiExternalLinkLine } from "react-icons/ri";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

// ─── AdminStations ────────────────────────────────────────────────────────────
export function AdminStations() {
    const dispatch = useDispatch();
    const { stationsAdmin, loading } = useSelector(s => s.stations);
    const { toast, show } = useToast();
    const { pending, confirm, handleConfirm, handleCancel } = useConfirm();

    useEffect(() => { dispatch(getAllStationsAdminThunk()); }, []);

    const handleDelete = async (id) => {
        const ok = await confirm("¿Eliminar esta estación? También se eliminarán sus comentarios.");
        if (!ok) return;
        await dispatch(deleteStationThunk(id));
        show("Estación eliminada");
    };

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <ConfirmDialog message={pending?.message} onConfirm={handleConfirm} onCancel={handleCancel} />

            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Estaciones</h2>
                <Link to="/usuario/crear-estacion" className="btn btn-primary btn-sm">
                    <RiAddLine size={16} /> Nueva estación
                </Link>
            </div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Dirección</th>
                            <th>Horario</th>
                            <th>Puestos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stationsAdmin.map(st => (
                            <tr key={st._id}>
                                <td className={styles.tdMain}>{st.address}</td>
                                <td><span className={styles.scheduleTag}>{st.schedule}</span></td>
                                <td>{st.spots?.length ?? 0}</td>
                                <td>
                                    <div className={styles.rowActions}>
                                        <Link to={`/usuario/estaciones-detalle/${st._id}`} className="btn btn-ghost btn-sm">
                                            <RiExternalLinkLine size={14} /> Ver
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(st._id)}>
                                            <RiDeleteBin6Line size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── AdminSpots ───────────────────────────────────────────────────────────────
export function AdminSpots() {
    const dispatch = useDispatch();
    const { spots, loading } = useSelector(s => s.spots);
    const { toast, show } = useToast();
    const { pending, confirm, handleConfirm, handleCancel } = useConfirm();

    useEffect(() => { dispatch(getAllSpotsThunk()); }, []);

    const handleDelete = async (id) => {
        const ok = await confirm("¿Eliminar este punto de carga?");
        if (!ok) return;
        await dispatch(deleteSpotThunk(id));
        show("Punto de carga eliminado");
    };

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <ConfirmDialog message={pending?.message} onConfirm={handleConfirm} onCancel={handleCancel} />

            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Puntos de carga</h2>
                <Link to="/usuario/crear-punto-carga" className="btn btn-primary btn-sm">
                    <RiAddLine size={16} /> Nuevo punto
                </Link>
            </div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Potencia</th>
                            <th>Tarifa</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spots.map(spot => (
                            <tr key={spot._id}>
                                <td className={styles.tdMain}>{spot.type}</td>
                                <td>{spot.power}</td>
                                <td>{spot.rate} €/kWh</td>
                                <td><StateBadge state={spot.state} /></td>
                                <td>
                                    <div className={styles.rowActions}>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(spot._id)}>
                                            <RiDeleteBin6Line size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── AdminUsers ───────────────────────────────────────────────────────────────
export function AdminUsers() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(s => s.users);

    useEffect(() => { dispatch(getAllUsersThunk()); }, []);

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Usuarios</h2>
                <span className={styles.count}>{users.length} registrados</span>
            </div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Puntos</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td className={styles.tdMain}>{u.username}</td>
                                <td className="text-muted" style={{ fontSize: "0.85rem" }}>{u.email}</td>
                                <td>{u.name} {u.surnames}</td>
                                <td>{u.points}</td>
                                <td>
                                    <span className={`badge ${u.rol === "admin" ? "badge-ocupado" : "badge-libre"}`}>
                                        {u.rol}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── AdminComments ────────────────────────────────────────────────────────────
export function AdminComments() {
    const dispatch = useDispatch();
    const { comments, loading } = useSelector(s => s.comments);
    const { toast, show } = useToast();
    const { pending, confirm, handleConfirm, handleCancel } = useConfirm();

    useEffect(() => { dispatch(getAllCommentsThunk()); }, []);

    const handleDelete = async (id) => {
        const ok = await confirm("¿Eliminar este comentario?");
        if (!ok) return;
        await dispatch(deleteCommentThunk(id));
        show("Comentario eliminado");
    };

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <ConfirmDialog message={pending?.message} onConfirm={handleConfirm} onCancel={handleCancel} />

            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Comentarios</h2>
                <span className={styles.count}>{comments.length} comentarios</span>
            </div>

            <div className={styles.commentList}>
                {comments.map(c => (
                    <div key={c._id} className={styles.commentRow}>
                        <div className={styles.commentMeta}>
                            <span className={styles.commentUser}>{c.user?.username || "Usuario"}</span>
                            <span className={styles.commentDate}>{moment(c.createdAt).fromNow()}</span>
                        </div>
                        <p className={styles.commentBody}>{c.body}</p>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>
                            <RiDeleteBin6Line size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
