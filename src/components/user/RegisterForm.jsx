import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk, loginThunk } from "../../store/slices/usersSlice";
import styles from "./AuthForms.module.css";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector(s => s.users);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("username",  data.username);
        formData.append("name",      data.name);
        formData.append("surnames",  data.surnames);
        formData.append("email",     data.email);
        formData.append("password",  data.password);
        if (data.image?.[0]) formData.append("image", data.image[0]);

        const res = await dispatch(registerThunk(formData));
        if (res.meta.requestStatus === "fulfilled") {
            await dispatch(loginThunk({ username: data.username, password: data.password }));
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Avatar preview */}
            <div className={styles.avatarPreview}>
                {preview && <img src={preview} alt="preview" />}
                <label className={styles.fileLabel}>
                    {preview ? "Cambiar foto" : "Subir foto (opcional)"}
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        {...register("image")}
                        onChange={e => {
                            if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                </label>
            </div>

            <div className="field">
                <label className="label">Usuario</label>
                <input className="input" {...register("username", { required: "Obligatorio" })} placeholder="Tu usuario" />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </div>

            <div className={styles.grid2}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <input className="input" {...register("name", { required: true })} placeholder="Nombre" />
                </div>
                <div className="field">
                    <label className="label">Apellidos</label>
                    <input className="input" {...register("surnames", { required: true })} placeholder="Apellidos" />
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <input className="input" type="email" {...register("email", { required: true })} placeholder="tu@email.com" />
            </div>

            <div className="field">
                <label className="label">Contraseña</label>
                <input className="input" type="password" {...register("password", { required: true, minLength: 6 })} placeholder="Mínimo 6 caracteres" />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
        </form>
    );
}
