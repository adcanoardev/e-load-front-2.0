import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    getPaymentsByUserThunk,
    createPaymentThunk,
    deletePaymentThunk,
} from "../../store/slices/otherSlices";
import { Spinner, Toast, ConfirmDialog } from "../ui";
import { useToast, useConfirm } from "../../hooks";
import styles from "./Payments.module.css";
import { RiBankCardLine, RiDeleteBin6Line, RiAddLine } from "react-icons/ri";

// ─── Card individual ──────────────────────────────────────────────────────────
function PaymentCard({ payment, onDelete }) {
    const masked = "•••• •••• •••• " + payment.lastFour;
    return (
        <div className={styles.card}>
            <div className={styles.cardIcon}><RiBankCardLine size={20} /></div>
            <div className={styles.cardInfo}>
                <span className={styles.cardNumber}>{masked}</span>
                <span className={styles.cardHolder}>{payment.cardHolderName}</span>
                <span className={styles.cardExpiry}>Válida hasta {payment.valMonth}/{payment.valYear}</span>
            </div>
            <button
                className={`btn btn-danger btn-sm ${styles.deleteBtn}`}
                onClick={() => onDelete(payment._id)}
            >
                <RiDeleteBin6Line size={14} />
            </button>
        </div>
    );
}

// ─── Formulario nueva tarjeta ─────────────────────────────────────────────────
function AddPaymentForm({ onSuccess }) {
    const dispatch = useDispatch();
    const { user }  = useSelector(s => s.users);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const res = await dispatch(createPaymentThunk(data));
        if (res.meta.requestStatus === "fulfilled") { reset(); onSuccess(); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
            <div className="field">
                <label className="label">Nombre en la tarjeta</label>
                <input className="input" {...register("cardHolderName", { required: true })} placeholder="John Doe" />
            </div>
            <div className="field">
                <label className="label">Número de tarjeta</label>
                <input className="input" {...register("number", { required: true, minLength: 16, maxLength: 16 })} placeholder="1234 5678 9012 3456" maxLength={16} />
            </div>
            <div className={styles.expiry}>
                <div className="field">
                    <label className="label">Mes</label>
                    <input className="input" {...register("valMonth", { required: true })} placeholder="08" maxLength={2} />
                </div>
                <div className="field">
                    <label className="label">Año</label>
                    <input className="input" {...register("valYear", { required: true })} placeholder="27" maxLength={2} />
                </div>
            </div>
            <div className={styles.formActions}>
                <button type="submit" className="btn btn-primary">Guardar tarjeta</button>
                <button type="button" className="btn btn-ghost" onClick={onSuccess}>Cancelar</button>
            </div>
        </form>
    );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Payments() {
    const dispatch = useDispatch();
    const { user }  = useSelector(s => s.users);
    const { payments, loading } = useSelector(s => s.payments);
    const { toast, show }       = useToast();
    const { pending, confirm, handleConfirm, handleCancel } = useConfirm();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { dispatch(getPaymentsByUserThunk(user._id)); }, []);

    const handleDelete = async (id) => {
        const ok = await confirm("¿Eliminar este método de pago?");
        if (!ok) return;
        const res = await dispatch(deletePaymentThunk({ id, userId: user._id }));
        if (res.meta.requestStatus === "fulfilled") show("Método de pago eliminado");
    };

    if (loading) return <Spinner />;

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <ConfirmDialog message={pending?.message} onConfirm={handleConfirm} onCancel={handleCancel} />

            <div className={styles.header}>
                <h2 className={styles.title}>Métodos de pago</h2>
                {!showForm && (
                    <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
                        <RiAddLine size={16} /> Añadir tarjeta
                    </button>
                )}
            </div>

            {showForm && (
                <div className={styles.formWrap}>
                    <AddPaymentForm onSuccess={() => { setShowForm(false); show("Tarjeta añadida"); }} />
                </div>
            )}

            <div className={styles.list}>
                {payments.length === 0 && !showForm && (
                    <p className="text-muted" style={{ textAlign: "center", padding: "var(--space-10) 0" }}>
                        No tienes métodos de pago guardados.
                    </p>
                )}
                {payments.map(p => (
                    <PaymentCard key={p._id} payment={p} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}
