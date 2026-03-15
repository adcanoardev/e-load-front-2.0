import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Contact.module.css";

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [sent, setSent] = useState(false);

    const onSubmit = () => {
        setSent(true);
        reset();
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.hero}>
                <span className={styles.eyebrow}>Contacto</span>
                <h1 className={styles.title}>Estamos aquí para ayudarte</h1>
                <p className={styles.sub}>
                    Cualquier consulta, estamos encantados de atenderte.
                </p>
            </div>

            <div className={styles.formWrap}>
                {sent ? (
                    <div className={styles.success}>
                        <span className={styles.successIcon}>✓</span>
                        <h3>Mensaje enviado</h3>
                        <p>Te responderemos en menos de 24 horas.</p>
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => setSent(false)}
                        >
                            Enviar otro mensaje
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className="field">
                            <label className="label">Nombre</label>
                            <input
                                className="input"
                                {...register("nombre", { required: true })}
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <input
                                className="input"
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div className="field">
                            <label className="label">Asunto</label>
                            <select
                                className="input"
                                {...register("asunto", { required: true })}
                            >
                                <option value="">Seleccionar asunto</option>
                                <option value="error">Reportar error</option>
                                <option value="contacto">Contacto general</option>
                                <option value="ayuda">Ayuda técnica</option>
                                <option value="facturacion">Facturación</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">Mensaje</label>
                            <textarea
                                className="input"
                                {...register("mensaje", { required: true })}
                                rows={5}
                                placeholder="Escribe tu mensaje aquí..."
                                style={{ resize: "vertical" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Enviar mensaje
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
