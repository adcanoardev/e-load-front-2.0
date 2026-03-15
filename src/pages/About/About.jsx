// ─── About.jsx ────────────────────────────────────────────────────────────────
import { motion } from "framer-motion";
import styles from "./About.module.css";

const PRINCIPLES = [
    { icon: "👥", title: "Simple",           desc: "Fácil de acceder, comprender y controlar." },
    { icon: "🧠", title: "Inteligente",      desc: "Siempre conectado, contigo y con tu vida." },
    { icon: "🎯", title: "Centrado en ti",   desc: "Diseñado para la gente real, intuitivo y con estética muy cuidada." },
];

export default function About() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className={styles.heroContent}
                >
                    <span className={styles.eyebrow}>Sobre nosotros</span>
                    <h1 className={styles.title}>Electrificando el futuro de la movilidad</h1>
                    <p className={styles.sub}>
                        Surgimos de la necesidad de abordar los desafíos ambientales y energéticos.
                        Inspirados por la creciente demanda de vehículos eléctricos, creamos una
                        solución integral de estaciones de carga en toda España.
                    </p>
                </motion.div>
            </section>

            <section className={styles.mission}>
                <div className={styles.missionGrid}>
                    <div>
                        <h2 className={styles.sectionTitle}>Nuestra misión</h2>
                        <p className={styles.body}>
                            En E-LOAD, impulsamos la movilidad eléctrica en España. Con nuestra red de
                            estaciones estratégicas, ofrecemos a los conductores la libertad de recorrer
                            el país sin preocupaciones. Un futuro sostenible está en nuestras manos.
                        </p>
                    </div>
                    <div>
                        <h2 className={styles.sectionTitle}>Nuestro origen</h2>
                        <p className={styles.body}>
                            Nació de la necesidad de abordar los desafíos ambientales y energéticos.
                            Nuestro objetivo es impulsar la adopción masiva de la movilidad sostenible
                            y contribuir al cuidado del planeta.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.principles}>
                <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
                    Principios de innovación
                </h2>
                <div className={styles.principleGrid}>
                    {PRINCIPLES.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            className={styles.principleCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className={styles.principleIcon}>{icon}</span>
                            <h3 className={styles.principleTitle}>{title}</h3>
                            <p className={styles.principleDesc}>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
