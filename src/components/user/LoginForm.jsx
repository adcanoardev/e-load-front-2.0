import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk, clearError } from "../../store/slices/usersSlice";
import PropTypes from "prop-types";
import styles from "./AuthForms.module.css";

export default function LoginForm({ onSuccess }) {
    const dispatch = useDispatch();
    const { error, loading, user } = useSelector(s => s.users);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (user) onSuccess?.();
    }, [user, onSuccess]);

    useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

    const onSubmit = (data) => dispatch(loginThunk(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="field">
                <label className="label">Usuario</label>
                <input className="input" {...register("username", { required: true })} placeholder="Tu usuario" />
            </div>
            <div className="field">
                <label className="label">Contraseña</label>
                <input className="input" type="password" {...register("password", { required: true })} placeholder="••••••••" />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <p className={styles.switchText}>
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="text-primary">Regístrate</Link>
            </p>
        </form>
    );
}
LoginForm.propTypes = { onSuccess: PropTypes.func };
