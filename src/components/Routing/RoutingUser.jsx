import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PersonalInformation from "../user/PersonalInformation";
import Payments            from "../payments/Payments";
import { AdminStations, AdminSpots, AdminUsers, AdminComments } from "../admin/Admin";
import { AdminStationCreate, AdminSpotCreate } from "../admin/AdminCreate";
import AdminStationDetail  from "../admin/AdminStationDetail";
import LoyaltyPoints       from "../../pages/LoyaltyPoints/LoyaltyPoints";
import MyRecharges         from "../../pages/MyRecharges/MyRecharges";
import Contact             from "../../pages/Contact/Contact";

function AdminRoute({ children }) {
    const { user } = useSelector(s => s.users);
    if (user?.rol !== "admin") return <Navigate to="/usuario" replace />;
    return children;
}
AdminRoute.propTypes = { children: PropTypes.node };

export default function RoutingUser() {
    return (
        <Routes>
            {/* Usuario */}
            <Route path="/"                  element={<PersonalInformation />} />
            <Route path="/metodos-de-pago"   element={<Payments />} />
            <Route path="/mis-recargas"      element={<MyRecharges />} />
            <Route path="/mis-puntos"        element={<LoyaltyPoints />} />
            <Route path="/reportar-error"    element={<Contact />} />

            {/* Admin */}
            <Route path="/estaciones"        element={<AdminRoute><AdminStations /></AdminRoute>} />
            <Route path="/crear-estacion"    element={<AdminRoute><AdminStationCreate /></AdminRoute>} />
            <Route path="/estaciones-detalle/:id" element={<AdminRoute><AdminStationDetail /></AdminRoute>} />
            <Route path="/puntos-carga"      element={<AdminRoute><AdminSpots /></AdminRoute>} />
            <Route path="/crear-punto-carga" element={<AdminRoute><AdminSpotCreate /></AdminRoute>} />
            <Route path="/usuarios"          element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/comentarios"       element={<AdminRoute><AdminComments /></AdminRoute>} />

            <Route path="*" element={<Navigate to="/usuario" replace />} />
        </Routes>
    );
}
