// App.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkSessionThunk } from "./store/slices/usersSlice";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Routing from "./components/routing/Routing";
import styles from "./App.module.css";

export default function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    // Verificar sesión solo al montar
    useEffect(() => {
        dispatch(checkSessionThunk());
    }, [dispatch]);

    // Scroll al tope en cada navegación
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // No mostrar footer en el mapa
    const isMapPage = location.pathname === "/mapa";

    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.content}>
                <Routing />
            </div>
            {!isMapPage && <Footer />}
        </div>
    );
}
