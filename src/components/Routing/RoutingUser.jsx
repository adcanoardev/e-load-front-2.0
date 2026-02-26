import { Route, Routes } from 'react-router-dom';
import ErrorReport from '../ErrorReport/ErrorReport';
import LoyaltyPoints from '../LoyaltyPoints/LoyaltyPoints';
import MyRecharges from '../MyRecharges/MyRecharges';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import RequireAuth from '../RequireAuth/RequireAuth';
import AdminStations from '../Admin/AdminStations/AdminStations';
import AdminSpots from '../Admin/AdminSpots/AdminSpots';
import AdminUsers from '../Admin/AdminUsers/AdminUsers';
import AdminComments from '../Admin/AdminComments/AdminComments';
import AdminStationDetail from '../Admin/AdminStationDetail/AdminStationDetail';
import AdminStationCreate from '../Admin/AdminStations/AdminStationCreate';
import AdminSpotCreate from '../Admin/AdminSpots/AdminSpotCreate';
import Payments from '../Payments/Payments';

const RoutingUser = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalInformation />} />
      <Route path="/metodos-de-pago" element={<Payments />} />
      <Route path="/mis-recargas" element={<MyRecharges />} />
      <Route path="/mis-puntos" element={<LoyaltyPoints />} />
      <Route path="/estaciones" element={
        <RequireAuth adminAccess>
          <AdminStations/>
        </RequireAuth>
      }/>
      <Route path='/crear-estacion' element={
        <RequireAuth adminAccess>
            <AdminStationCreate/>
        </RequireAuth>
      }
      />
      <Route path="/estaciones-detalle/:id" element={
        <RequireAuth adminAccess>
          <AdminStationDetail/>
        </RequireAuth>
      }
      />
      <Route path="/puntos-carga" element={
        <RequireAuth adminAccess>
          <AdminSpots/>
        </RequireAuth>
      }
      />
      <Route path='/crear-punto-carga' element={
        <RequireAuth adminAccess>
            <AdminSpotCreate/>
        </RequireAuth>
      }
      />
      <Route path="/usuarios" element={
        <RequireAuth adminAccess>
          <AdminUsers/>
        </RequireAuth>
      }
      />
      <Route path="/comentarios" element={
        <RequireAuth adminAccess>
          <AdminComments/>
        </RequireAuth>
      }
      />
      <Route path="/reportar-error" element={<ErrorReport />} />
    </Routes>
  );
}

export default RoutingUser;