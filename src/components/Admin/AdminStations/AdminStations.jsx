import { useEffect } from "react";
import { getAllStationsAdmin } from "../../../redux/stations/stations.actions";
import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
import AdminStationCard from "./AdminStationCard";
import { Link, NavLink } from "react-router-dom";
import { Button, Divider, Flex, Grid, Heading, Spacer, Spinner } from "@chakra-ui/react";

const AdminStations = () => {
    const { loading, stationsAdmin } = useSelector((state) => state.stations);
    useEffect(() => {
        getAllStationsAdmin();
    }, []);
    if (loading || !stationsAdmin) {
        return (
            <Flex justify="center" align="center" width="100%" height="100vh">
                <Spinner height="80px" width="80px" thickness="5px" color="secondaryColor" emptyColor="defaultColor" />
            </Flex>
        );
    }
    return (
        <Flex display="column">
            <Flex>
                <Heading size="lg">Estaciones</Heading>
                <Spacer />

                <Link as={NavLink} to={"/usuario/crear-estacion"}>
                    <Button
                        bg={"defaultColor"}
                        color={"whiteColor"}
                        _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                    >
                        CREAR ESTACIÓN
                    </Button>
                </Link>
            </Flex>
            <Divider my={5} />
            <Grid display={"flex"} gap={6} flexWrap={"wrap"} justifyContent={{ base: "center", md: "start" }}>
                {stationsAdmin.map((station) => {
                    return <AdminStationCard station={station} key={station._id} />;
                })}
            </Grid>
        </Flex>
    );
};
// AdminStations.propTypes = {
//   station: PropTypes.object,
// };

export default AdminStations;
