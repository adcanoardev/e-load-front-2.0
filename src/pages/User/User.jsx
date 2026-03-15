import { useEffect, useState } from "react";
import SideBar from "../../components/layout/SideBar";
import RoutingUser from "../../components/routing/RoutingUser";
import styles from "./User.module.css";

export default function User() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const fn = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);

    return (
        <div className={styles.wrap}>
            {!isMobile && <SideBar />}
            <main className={styles.main}>
                <RoutingUser />
            </main>
        </div>
    );
}
