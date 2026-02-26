import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getStationById } from "../../../redux/stations/stations.actions";
import { useSelector } from "react-redux";
import { Button, useDisclosure, Flex, Spacer, Divider, Grid, Spinner, Heading, Text } from "@chakra-ui/react";
import { getSpotsByStation } from "../../../redux/spots/spots.actions";
import AdminStationDetailEdit from "./AdminStationDetailEdit";
import AdminStationDeleteAlert from "../AdminStations/AdminStationDeleteAlert";
import AdminSpotCard from "../AdminSpots/AdminSpotCard";
import { AccessTime, Place, Power } from "@mui/icons-material";

const AdminStationDetail = () => {
  const { id } = useParams();
  const { loading, stationSelected } = useSelector((state) => state.stations);
  const { spotsByStation } = useSelector((state) => state.spots);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  useEffect(() => {
    getStationById(id);
    getSpotsByStation(id);
  }, [id]);
  if (loading || !stationSelected) {
    return (
      <Flex justify="center" align="center" width='100%' height="100vh">
        <Spinner height='80px' width='80px' thickness="5px"  color="secondaryColor" emptyColor="defaultColor"/>
      </Flex>
    );
  }

  return (
    <>
      <Flex minWidth="100%" flexDir="column">
        <Flex alignItems="center">
          <Heading size='md'>{stationSelected.address}</Heading>
          <Spacer />
          <Flex alignItems="center" gap={3}>
            <AdminStationDetailEdit />
            <Button
              bg={"redColor"}
              color={"whiteColor"}
              _hover={{ bg: "redColor", color: "defaultColor" }}
              onClick={onOpen}
            >
              BORRAR
            </Button>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Flex gap={6}>
          <Flex direction="column">
            <h3>Coordenadas:</h3>
            <Text>Latitud: {stationSelected.coordinates.lat}</Text>
            <Text>Longitud: {stationSelected.coordinates.lng}</Text>
            <Link
              to={`https://maps.google.com/?q=${stationSelected.coordinates.lat},${stationSelected.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flex>
                <Place/><Text>Ver en Google Maps</Text>
              </Flex>
            </Link>
            <Divider my={6} />
            <Flex>
              <AccessTime/><Text>Horario: {stationSelected.schedule}</Text>
            </Flex>
            <Flex>
            <Power/><Text>Puestos de Carga: {stationSelected.spots.length}</Text>
            </Flex>
            <Divider my={6} />
            <Text>Me gusta: {stationSelected.likes}</Text>
            <Button
              mt={3}
              bg={"lightColor"}
              color={"defaultColor"}
              _hover={{ bg: "secondaryColor", color: "defaultColor" }}
            >
              Comentarios
            </Button>
          </Flex>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            gridAutoFlow="row dense"
          >
            {spotsByStation.map((spot) => {
              return <AdminSpotCard spot={spot} key={spot._id} />;
            })}
          </Grid>
        </Flex>
      </Flex>
      {isOpen && <AdminStationDeleteAlert isOpen={isOpen} onClose={onClose} station={stationSelected} isAdminStationDetail/>}
    </>
  );
};

export default AdminStationDetail;
