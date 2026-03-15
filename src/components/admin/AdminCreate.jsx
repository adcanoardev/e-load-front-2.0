import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createStationThunk, getAllStationsThunk } from "../../store/slices/stationsSlice";
import { createSpotThunk } from "../../store/slices/spotsSlice";
import { Toast } from "../ui";
import { useToast } from "../../hooks";
import styles from "./Admin.module.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function ClickHandler({ onCoords }) {
    useMapEvents({ click: (e) => onCoords(e.latlng) });
    return null;
}

// ─── AdminStationCreate ───────────────────────────────────────────────────────
export function AdminStationCreate() {
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const { toast, show } = useToast();
    const { register, handleSubmit, reset } = useForm();
    const [coords, setCoords] = useState(null);

    const onSubmit = async (data) => {
        if (!coords) { show("Haz clic en el mapa para seleccionar ubicación", "error"); return; }
        const res = await dispatch(createStationThunk({
            ...data,
            coordinatesLat: coords.lat,
            coordinatesLng: coords.lng,
        }));
        if (res.meta.requestStatus === "fulfilled") {
            show("Estación creada");
            reset();
            setCoords(null);
            setTimeout(() => navigate("/usuario/estaciones"), 1000);
        }
    };

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Nueva estación</h2>
            </div>
            <div className={styles.createWrap}>
                <div className={styles.mapWrap}>
                    <MapContainer center={[40.3, -3.4]} zoom={6} style={{ height: "100%", width: "100%" }}>
                        <ClickHandler onCoords={setCoords} />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        {coords && <Marker position={coords} />}
                    </MapContainer>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                    <div className="field">
                        <label className="label">Latitud</label>
                        <input className="input" readOnly value={coords?.lat?.toFixed(6) || ""} placeholder="Haz clic en el mapa" />
                    </div>
                    <div className="field">
                        <label className="label">Longitud</label>
                        <input className="input" readOnly value={coords?.lng?.toFixed(6) || ""} placeholder="Haz clic en el mapa" />
                    </div>
                    <div className="field">
                        <label className="label">Dirección</label>
                        <input className="input" {...register("address", { required: true })} placeholder="Calle Mayor 10, Madrid" />
                    </div>
                    <div className="field">
                        <label className="label">Horario</label>
                        <select className="input" {...register("schedule", { required: true })}>
                            <option value="">Seleccionar horario</option>
                            <option value="10:00 - 22:00">10:00 - 22:00</option>
                            <option value="24 Horas">24 Horas</option>
                            <option value="Cerrada">Cerrada</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear estación</button>
                </form>
            </div>
        </div>
    );
}

// ─── AdminSpotCreate ──────────────────────────────────────────────────────────
export function AdminSpotCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stations, loading } = useSelector(s => s.stations);
    const { toast, show } = useToast();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => { dispatch(getAllStationsThunk()); }, []);

    const onSubmit = async (data) => {
        const res = await dispatch(createSpotThunk(data));
        if (res.meta.requestStatus === "fulfilled") {
            show("Punto de carga creado");
            reset();
            setTimeout(() => navigate("/usuario/puntos-carga"), 1000);
        }
    };

    return (
        <div className={styles.wrap}>
            <Toast message={toast?.message} type={toast?.type} />
            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Nuevo punto de carga</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm} style={{ maxWidth: 400 }}>
                <div className="field">
                    <label className="label">Potencia</label>
                    <select className="input" {...register("power", { required: true })}>
                        <option value="">Seleccionar</option>
                        {["2.3 kW","3.7 kW","7.4 kW","11 kW","22 kW","43 kW","50 kW"].map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label className="label">Tipo de conector</label>
                    <select className="input" {...register("type", { required: true })}>
                        <option value="">Seleccionar</option>
                        {["CHAdeMO","CCS2","Type2","Schuko"].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label className="label">Tarifa (€/kWh)</label>
                    <input className="input" {...register("rate", { required: true })} placeholder="0.28" />
                </div>
                <div className="field">
                    <label className="label">Estado inicial</label>
                    <select className="input" {...register("state")}>
                        <option value="Libre">Libre</option>
                        <option value="Fuera de Servicio">Fuera de Servicio</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Estación</label>
                    <select className="input" {...register("station", { required: true })} disabled={loading}>
                        <option value="">Seleccionar estación</option>
                        {stations.map(st => (
                            <option key={st._id} value={st._id}>{st.address}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear punto de carga</button>
            </form>
        </div>
    );
}
