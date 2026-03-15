import PropTypes from "prop-types";

// ─── Spinner ──────────────────────────────────────────────────────────────────
export const Spinner = () => (
    <div className="spinner-wrap"><div className="spinner" /></div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
export const Toast = ({ message, type = "success" }) => {
    if (!message) return null;
    return (
        <div className={`toast toast-${type}`}>
            {type === "success" ? "✓" : "✕"} {message}
        </div>
    );
};
Toast.propTypes = { message: PropTypes.string, type: PropTypes.string };

// ─── Modal ────────────────────────────────────────────────────────────────────
export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    );
};
Modal.propTypes = {
    isOpen: PropTypes.bool, onClose: PropTypes.func,
    title: PropTypes.string, children: PropTypes.node,
};

// ─── ConfirmDialog ────────────────────────────────────────────────────────────
export const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    if (!message) return null;
    return (
        <div className="modal-overlay">
            <div className="modal" style={{ maxWidth: 360 }}>
                <p style={{ marginBottom: "var(--space-6)", color: "var(--color-text-muted)" }}>{message}</p>
                <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancelar</button>
                    <button className="btn btn-danger btn-sm" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};
ConfirmDialog.propTypes = { message: PropTypes.string, onConfirm: PropTypes.func, onCancel: PropTypes.func };

// ─── Badge de estado de spot ──────────────────────────────────────────────────
export const StateBadge = ({ state }) => {
    const cls = state === "Libre" ? "libre" : state === "Ocupado" ? "ocupado" : "fuera";
    return <span className={`badge badge-${cls}`}>{state}</span>;
};
StateBadge.propTypes = { state: PropTypes.string };

// ─── Avatar ───────────────────────────────────────────────────────────────────
const DEFAULT_AVATAR = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469069/e-load/e-load-avatar_e0k9w4.png";
export const Avatar = ({ src, name, size = 40 }) => (
    <div style={{
        width: size, height: size, borderRadius: "50%",
        overflow: "hidden", flexShrink: 0,
        background: "var(--color-surface-2)",
        border: "2px solid var(--color-border)",
    }}>
        <img
            src={src || DEFAULT_AVATAR}
            alt={name || "avatar"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { e.target.src = DEFAULT_AVATAR; }}
        />
    </div>
);
Avatar.propTypes = { src: PropTypes.string, name: PropTypes.string, size: PropTypes.number };
