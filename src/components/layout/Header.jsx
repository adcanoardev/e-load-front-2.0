import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/usersSlice";
import { Modal, Avatar } from "../ui";
import LoginForm from "../user/LoginForm";
import styles from "./Header.module.css";

const NAV_LINKS = [
    { to: "/",              label: "Inicio" },
    { to: "/mapa",          label: "Mapa" },
    { to: "/sobre-nosotros",label: "Nosotros" },
    { to: "/contacto",      label: "Contacto" },
];

export default function Header() {
    const { user } = useSelector(s => s.users);
    const dispatch  = useDispatch();
    const location  = useLocation();
    const [loginOpen,    setLoginOpen]    = useState(false);
    const [menuOpen,     setMenuOpen]     = useState(false);
    const [profileOpen,  setProfileOpen]  = useState(false);

    const handleLogout = () => { dispatch(logout()); setProfileOpen(false); };

    const userMenu = [
        { label: "Mi perfil",         to: "/usuario" },
        { label: "Métodos de pago",   to: "/usuario/metodos-de-pago" },
        { label: "Mis recargas",      to: "/usuario/mis-recargas" },
        { label: "Mis puntos",        to: "/usuario/mis-puntos" },
    ];
    const adminMenu = [
        { label: "Estaciones",        to: "/usuario/estaciones" },
        { label: "Puntos de carga",   to: "/usuario/puntos-carga" },
        { label: "Usuarios",          to: "/usuario/usuarios" },
    ];

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        <img
                            src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469078/e-load/e-load-logo_m7r1jg.png"
                            alt="E-Load"
                            height={28}
                        />
                    </Link>

                    {/* Nav desktop */}
                    <nav className={styles.nav}>
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to} to={to}
                                className={`${styles.navLink} ${location.pathname === to ? styles.active : ""}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Acciones */}
                    <div className={styles.actions}>
                        {user ? (
                            <div className={styles.profileWrap}>
                                <button
                                    className={styles.profileBtn}
                                    onClick={() => setProfileOpen(p => !p)}
                                >
                                    <Avatar src={user.image} name={user.name} size={36} />
                                    <span className={styles.profileName}>{user.name}</span>
                                    <span className={styles.chevron}>{profileOpen ? "▲" : "▼"}</span>
                                </button>
                                {profileOpen && (
                                    <div className={styles.dropdown}>
                                        {userMenu.map(({ label, to }) => (
                                            <Link key={to} to={to} className={styles.dropItem} onClick={() => setProfileOpen(false)}>
                                                {label}
                                            </Link>
                                        ))}
                                        {user.rol === "admin" && (
                                            <>
                                                <hr className="divider" style={{ margin: "4px 0" }} />
                                                <span className={styles.dropLabel}>Admin</span>
                                                {adminMenu.map(({ label, to }) => (
                                                    <Link key={to} to={to} className={styles.dropItem} onClick={() => setProfileOpen(false)}>
                                                        {label}
                                                    </Link>
                                                ))}
                                            </>
                                        )}
                                        <hr className="divider" style={{ margin: "4px 0" }} />
                                        <button className={`${styles.dropItem} ${styles.dropLogout}`} onClick={handleLogout}>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button className={styles.loginBtn} onClick={() => setLoginOpen(true)}>
                                    Entrar
                                </button>
                                <Link to="/registro" className="btn btn-primary btn-sm">
                                    Registro
                                </Link>
                            </>
                        )}

                        {/* Hamburger mobile */}
                        <button
                            className={styles.burger}
                            onClick={() => setMenuOpen(p => !p)}
                            aria-label="Menú"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to} to={to}
                                className={styles.mobileLink}
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Modal login */}
            <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)} title="Bienvenido de nuevo">
                <LoginForm onSuccess={() => setLoginOpen(false)} />
            </Modal>
        </>
    );
}
