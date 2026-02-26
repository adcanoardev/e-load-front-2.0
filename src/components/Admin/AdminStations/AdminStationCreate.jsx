import { Divider, Flex, Heading } from '@chakra-ui/react'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'
import AdminStationForm from './AdminStationForm';
import { useState } from 'react';

const AdminStationCreate = () => {
    const center = [40.30, -3.40];
    const zoom = 7;
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);

    const ClickEventHandler = () => {
        useMapEvent({
            click: (e) => {
                const { latlng } = e;
                setSelectedCoordinates(latlng);
            }
        });
        return null;
    }
  return (
    <Flex direction='column' width='100%'>
        <Heading size='lg'>Crear Estación</Heading>
        <Divider my={5}/>
        <Flex gap={6}>
            <Flex w={800} minH={600} className="leaflet-container">
                <MapContainer
                    center={center}
                    zoom={zoom}
                >
                    <ClickEventHandler/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </Flex>
            <Flex>            
                <AdminStationForm selectedCoordinates={selectedCoordinates}/>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default AdminStationCreate