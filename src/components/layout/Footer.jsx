import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const COLS = [
    {
        title: "Asistencia",
        items: [
            { label: "Lun–Jue: 9:00 – 18:30" },
            { label: "Viernes: 9:00 – 15:00" },
            { label: "Tel: 91 078 07 11" },
            { label: "contacto@e-load.es" },
        ],
    },
    {
        title: "Compañía",
        items: [
            { label: "Sobre nosotros", to: "/sobre-nosotros" },
            { label: "Contacto",       to: "/contacto" },
            { label: "Mapa",           to: "/mapa" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Cookies",              to: "#" },
            { label: "Política de privacidad", to: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <img
                        src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469078/e-load/e-load-logo_m7r1jg.png"
                        alt="E-Load" height={24}
                    />
                    <p className={styles.tagline}>Carga inteligente. Muévete libre.</p>
                </div>
                {COLS.map(col => (
                    <div key={col.title} className={styles.col}>
                        <h4 className={styles.colTitle}>{col.title}</h4>
                        <ul className={styles.colList}>
                            {col.items.map(item => (
                                <li key={item.label}>
                                    {item.to
                                        ? <Link to={item.to} className={styles.colLink}>{item.label}</Link>
                                        : <span className={styles.colText}>{item.label}</span>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className={styles.bottom}>
                <span>© 2024 E-Load. Todos los derechos reservados.</span>
                <div className={styles.social}>
                    {["linkedin", "instagram", "twitter"].map(net => (
                        <a key={net} href={`https://${net}.com`} target="_blank" rel="noopener noreferrer"
                            className={styles.socialLink}>
                            {net.charAt(0).toUpperCase()}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
