import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const STATS = [
    { n: "150.000+", label: "Puntos de carga" },
    { n: "250.000+", label: "Usuarios activos" },
    { n: "47",       label: "Provincias cubiertas" },
];

const FEATURES = [
    {
        icon: "⚡",
        title: "FIND",
        desc: "Localiza el punto de carga más cercano entre más de 150.000 disponibles en toda España.",
    },
    {
        icon: "🔌",
        title: "PLUG",
        desc: "Activa tu cargador de forma rápida y segura directamente desde la app.",
    },
    {
        icon: "🚗",
        title: "GO",
        desc: "Recarga completada. Recoge tu vehículo y sigue tu camino sin preocupaciones.",
    },
];

const stagger = { animate: { transition: { staggerChildren: 0.15 } } };
const fadeUp  = {
    initial:  { opacity: 0, y: 30 },
    animate:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
    return (
        <div className={styles.page}>
            {/* ── Hero ─────────────────────────────────── */}
            <section className={styles.hero}>
                <video autoPlay loop muted playsInline className={styles.heroBg}>
                    <source src="https://res.cloudinary.com/dgkm71mjf/video/upload/v1686474818/e-load/e-load-section-01_hq4smf.mp4" type="video/mp4" />
                </video>
                <div className={styles.heroOverlay} />
                <motion.div
                    className={styles.heroContent}
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                >
                    {["FIND", "CHARGE", "GO"].map((word, i) => (
                        <motion.h1 key={word} className={styles.heroWord} variants={fadeUp}>
                            {word}<span className={styles.slash}>/</span>
                        </motion.h1>
                    ))}
                    <motion.p className={styles.heroSub} variants={fadeUp}>
                        Conduce hasta cualquier lugar.
                    </motion.p>
                    <motion.div className={styles.heroActions} variants={fadeUp}>
                        <Link to="/mapa" className="btn btn-primary btn-lg">
                            Descubrir estaciones
                        </Link>
                        <Link to="/sobre-nosotros" className="btn btn-ghost btn-lg">
                            Sobre nosotros
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Stats ────────────────────────────────── */}
            <section className={styles.stats}>
                {STATS.map(({ n, label }) => (
                    <motion.div
                        key={label}
                        className={styles.statItem}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className={styles.statNumber}>{n}</span>
                        <span className={styles.statLabel}>{label}</span>
                    </motion.div>
                ))}
            </section>

            {/* ── Features ─────────────────────────────── */}
            <section className={styles.features}>
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Cómo funciona
                </motion.h2>
                <div className={styles.featureGrid}>
                    {FEATURES.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            className={styles.featureCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className={styles.featureIcon}>{icon}</span>
                            <h3 className={styles.featureTitle}>
                                {title}<span className={styles.slash}>/</span>
                            </h3>
                            <p className={styles.featureDesc}>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────── */}
            <section className={styles.cta}>
                <div className={styles.ctaOverlay} />
                <motion.div
                    className={styles.ctaContent}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.ctaTitle}>¿Quieres formar parte de nuestra red?</h2>
                    <p className={styles.ctaSub}>Únete a los 250.000 usuarios que ya cargan con E-Load.</p>
                    <Link to="/registro" className="btn btn-primary btn-lg">
                        Crear cuenta gratis
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
