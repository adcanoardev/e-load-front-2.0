import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../store/slices/usersSlice";
import { Avatar, Toast } from "../ui";
import { useToast } from "../../hooks";
import styles from "./PersonalInformation.module.css";

export default function PersonalInformation() {
    const { user, loading } = useSelector(s => s.users);
    const dispatch = useDispatch();
    const { toast, show } = useToast();
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.name)     formData.append("name",     data.name);
        if (data.surnames) formData.append("surnames", data.surnames);
        if (data.email)    formData.append("email",    data.email);
        if (data.password) formData.append("password", data.password);
        if (data.image?.[0]) formData.append("image",  data.image[0]);

        const res = await dispatch(updateUserThunk({ id: user._id, formData }));
        if (res.meta.requestStatus === "fulfilled") show("Perfil actualizado correctamente");
        else show(res.payload || "Error al actualizar", "error");
    };

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />

            <div className={styles.header}>
                <h2 className={styles.title}>Información personal</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* Avatar */}
                <div className={styles.avatarSection}>
                    <Avatar src={preview || user?.image} name={user?.name} size={80} />
                    <div className={styles.avatarInfo}>
                        <span className={styles.avatarName}>{user?.username}</span>
                        <label className={styles.uploadBtn}>
                            Cambiar foto
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                {...register("image")}
                                onChange={e => {
                                    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                            />
                        </label>
                    </div>
                </div>

                <hr className="divider" />

                <div className={styles.grid}>
                    <div className="field">
                        <label className="label">Nombre</label>
                        <input className="input" {...register("name")} defaultValue={user?.name} />
                    </div>
                    <div className="field">
                        <label className="label">Apellidos</label>
                        <input className="input" {...register("surnames")} defaultValue={user?.surnames} />
                    </div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                        <label className="label">Email</label>
                        <input className="input" type="email" {...register("email")} defaultValue={user?.email} />
                    </div>
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                        <label className="label">Nueva contraseña</label>
                        <input className="input" type="password" {...register("password")} placeholder="Dejar vacío para no cambiar" />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}
