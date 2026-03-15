import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/usersSlice";
import { Avatar } from "../ui";
import styles from "./SideBar.module.css";
import {
    RiUserLine, RiBankCardLine, RiMapPinLine, RiStarLine,
    RiBugLine, RiLogoutBoxLine, RiBaseStationLine,
    RiFlashlightLine, RiGroupLine,
} from "react-icons/ri";

const USER_MENU = [
    { label: "Mi perfil",       to: "/usuario",                    icon: RiUserLine },
    { label: "Métodos de pago", to: "/usuario/metodos-de-pago",    icon: RiBankCardLine },
    { label: "Mis recargas",    to: "/usuario/mis-recargas",       icon: RiMapPinLine },
    { label: "Mis puntos",      to: "/usuario/mis-puntos",         icon: RiStarLine },
    { label: "Reportar error",  to: "/usuario/reportar-error",     icon: RiBugLine },
];

const ADMIN_MENU = [
    { label: "Estaciones",       to: "/usuario/estaciones",        icon: RiBaseStationLine },
    { label: "Puntos de carga",  to: "/usuario/puntos-carga",      icon: RiFlashlightLine },
    { label: "Usuarios",         to: "/usuario/usuarios",          icon: RiGroupLine },
];

export default function SideBar() {
    const { user } = useSelector(s => s.users);
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    const handleLogout = () => { dispatch(logout()); navigate("/"); };

    return (
        <aside className={styles.sidebar}>
            {/* User info */}
            <div className={styles.userInfo}>
                <Avatar src={user?.image} name={user?.name} size={48} />
                <div className={styles.userText}>
                    <span className={styles.userName}>{user?.name}</span>
                    <span className={styles.userRole}>{user?.rol === "admin" ? "Administrador" : "Usuario"}</span>
                </div>
            </div>

            <hr className="divider" />

            <nav className={styles.nav}>
                {USER_MENU.map(({ label, to, icon: Icon }) => (
                    <NavLink
                        key={to} to={to} end={to === "/usuario"}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ""}`
                        }
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </NavLink>
                ))}

                {user?.rol === "admin" && (
                    <>
                        <div className={styles.sectionLabel}>Admin</div>
                        {ADMIN_MENU.map(({ label, to, icon: Icon }) => (
                            <NavLink
                                key={to} to={to}
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.active : ""}`
                                }
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </>
                )}
            </nav>

            <div className={styles.bottom}>
                <hr className="divider" />
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <RiLogoutBoxLine size={18} />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}
