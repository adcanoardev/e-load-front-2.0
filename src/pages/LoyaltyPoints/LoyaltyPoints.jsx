import { useSelector } from "react-redux";
import styles from "./LoyaltyPoints.module.css";

const LEVELS = [
    { name: "Bronce",  min: 0,    color: "#CD7F32" },
    { name: "Plata",   min: 250,  color: "#C0C0C0" },
    { name: "Oro",     min: 500,  color: "#FFD700" },
    { name: "Platino", min: 750,  color: "#4be62e" },
];

export default function LoyaltyPoints() {
    const { user } = useSelector(s => s.users);
    const points   = user?.points || 0;
    const MAX      = 1000;
    const pct      = Math.min((points / MAX) * 100, 100);
    const level    = [...LEVELS].reverse().find(l => points >= l.min) || LEVELS[0];

    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>Mis puntos de fidelización</h2>

            {/* Card principal */}
            <div className={styles.card}>
                <div className={styles.levelBadge} style={{ color: level.color }}>
                    {level.name}
                </div>
                <div className={styles.pointsNum}>{points.toLocaleString()}</div>
                <p className={styles.pointsLabel}>puntos acumulados</p>

                <div className={styles.barWrap}>
                    <div className={styles.bar}>
                        <div
                            className={styles.barFill}
                            style={{ width: `${pct}%`, background: level.color }}
                        />
                    </div>
                    <div className={styles.barLabels}>
                        <span>0</span>
                        <span>{MAX.toLocaleString()} pts</span>
                    </div>
                </div>
            </div>

            {/* Niveles */}
            <h3 className={styles.subtitle}>Niveles de fidelización</h3>
            <div className={styles.levelGrid}>
                {LEVELS.map(l => (
                    <div
                        key={l.name}
                        className={`${styles.levelCard} ${points >= l.min ? styles.levelActive : ""}`}
                    >
                        <div
                            className={styles.levelDot}
                            style={{ background: points >= l.min ? l.color : "var(--color-border)" }}
                        />
                        <span className={styles.levelName}>{l.name}</span>
                        <span className={styles.levelMin}>{l.min.toLocaleString()} pts</span>
                    </div>
                ))}
            </div>

            {/* Info */}
            <div className={styles.infoBox}>
                <p>⚡ Ganas <strong>100 puntos</strong> por cada recarga completada.</p>
                <p>🎁 Canjea tus puntos por descuentos en futuras recargas.</p>
                <p>🏆 Alcanza el nivel Platino para acceso prioritario a puestos.</p>
            </div>
        </div>
    );
}
