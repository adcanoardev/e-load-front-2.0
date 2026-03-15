import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAllStationsThunk, getStationByIdThunk } from "../../store/slices/stationsSlice";
import { getSpotsByStationThunk } from "../../store/slices/spotsSlice";
import { getCommentsByStationThunk } from "../../store/slices/otherSlices";
import StationDrawer from "./StationDrawer";
import styles from "./Map.module.css";

const eloadIcon = L.icon({
    iconUrl:    "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686496157/e-load/e-load-marcador_g3vmf7.png",
    shadowUrl:  "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686496330/e-load/e-load-marcador-sombra_rh9iy1.png",
    iconSize:   [33, 50],
    shadowSize: [50, 50],
    iconAnchor: [20, 50],
    shadowAnchor: [17, 50],
});

export default function MapPage() {
    const dispatch  = useDispatch();
    const { stations } = useSelector(s => s.stations);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => { dispatch(getAllStationsThunk()); }, []);

    const handleMarkerClick = async (station) => {
        await dispatch(getStationByIdThunk(station._id));
        await dispatch(getSpotsByStationThunk(station._id));
        setDrawerOpen(true);
    };

    return (
        <div className={styles.wrap}>
            <MapContainer
                className={styles.map}
                center={[40.30, -3.40]}
                zoom={7}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {stations.map(station => (
                    <Marker
                        key={station._id}
                        position={[station.coordinates.lat, station.coordinates.lng]}
                        icon={eloadIcon}
                        eventHandlers={{ click: () => handleMarkerClick(station) }}
                    />
                ))}
            </MapContainer>

            <StationDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </div>
    );
}
