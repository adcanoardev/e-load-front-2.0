import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getAllStations, getStationById } from "../../redux/stations/stations.actions";
import Station from "../../components/Station/Station";
import { getSpotsByStation } from "../../redux/spots/spots.actions";

const Map = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loading, stations } = useSelector((state) => state.stations);
    const [selectedStation, setSelectedStation] = useState(null);

    const handleMarkerClick = async (station) => {
        await getSpotsByStation(station._id);
        await getStationById(station._id);
        setSelectedStation(station);
        onOpen();
    };

    // eslint-disable-next-line no-undef
    const eloadIcon = L.icon({
        iconUrl: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686496157/e-load/e-load-marcador_g3vmf7.png",
        shadowUrl:
            "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686496330/e-load/e-load-marcador-sombra_rh9iy1.png",
        iconSize: [33, 50],
        shadowSize: [50, 50],
        iconAnchor: [20, 50],
        shadowAnchor: [17, 50],
    });

    useEffect(() => {
        getAllStations();
    }, []);

    return (
        <>
            <Flex width="100vw" height="100vh">
                <MapContainer className="leaflet-container" center={{ lat: "40.30", lng: "-3.40" }} zoom={7}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {stations.map((station) => {
                        const position = [station.coordinates.lat, station.coordinates.lng];
                        return (
                            <div key={position}>
                                <Marker
                                    position={position}
                                    icon={eloadIcon}
                                    eventHandlers={{ click: () => handleMarkerClick(station) }}
                                />
                            </div>
                        );
                    })}
                </MapContainer>
            </Flex>
            {selectedStation && <Station isOpen={isOpen} onClose={onClose} />}
        </>
    );
};

export default Map;
