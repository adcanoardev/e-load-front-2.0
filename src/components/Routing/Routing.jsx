// Routing.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home     from "../../pages/Home/Home";
import About    from "../../pages/About/About";
import MapPage  from "../map/MapPage";
import Register from "../../pages/Register/Register";
import User     from "../../pages/User/User";
import Contact  from "../../pages/Contact/Contact";
import PropTypes from "prop-types";

function RequireAuth({ children, guestOnly = false, adminOnly = false }) {
    const { user } = useSelector(s => s.users);
    if (guestOnly && user)    return <Navigate to="/" replace />;
    if (!guestOnly && !user)  return <Navigate to="/" replace />;
    if (adminOnly && user?.rol !== "admin") return <Navigate to="/" replace />;
    return children;
}
RequireAuth.propTypes = { children: PropTypes.node, guestOnly: PropTypes.bool, adminOnly: PropTypes.bool };

export default function Routing() {
    return (
        <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/mapa"           element={<MapPage />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto"       element={<Contact />} />
            <Route path="/registro"       element={
                <RequireAuth guestOnly>
                    <Register />
                </RequireAuth>
            } />
            <Route path="/usuario/*"      element={
                <RequireAuth>
                    <User />
                </RequireAuth>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
