// pages/Register/Register.jsx
import RegisterForm from "../../components/user/RegisterForm";
import styles from "./Register.module.css";

export function Register() {
    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <h1 className={styles.title}>Crear cuenta</h1>
                <p className={styles.sub}>Únete a la mayor red de carga eléctrica de España.</p>
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
