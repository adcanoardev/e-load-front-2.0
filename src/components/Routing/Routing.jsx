import { Route, Routes } from "react-router-dom";
import Map from "../../pages/Map/Map";
import Register from "../../pages/Register/Register";
import ContactForm from "../ContactForm/ContactForm";
import User from "../../pages/User/User";
import Home from "../../pages/Home/Home";
import RequireAuth from "../RequireAuth/RequireAuth";
import About from "../../pages/About/About";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<Map />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route
                path="/registro"
                element={
                    <RequireAuth userAccess>
                        <Register />
                    </RequireAuth>
                }
            />
            <Route path="/contacto" element={<ContactForm />} />
            <Route
                path="/usuario/*"
                element={
                    <RequireAuth>
                        <User />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};

export default Routing;
