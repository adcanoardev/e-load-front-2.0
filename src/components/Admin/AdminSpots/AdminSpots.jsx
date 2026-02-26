import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Flex, Grid, Heading, Spacer, Spinner } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import AdminSpotCard from "./AdminSpotCard";
import { getAllSpots } from "../../../redux/spots/spots.actions";

const AdminSpots = () => {
  const { loading, spots } = useSelector((state) => state.spots);
  useEffect(() => {
    getAllSpots();
  }, []);
  if (loading || !spots) {
    return (
      <Flex justify="center" align="center" width='100%' height="100vh">
        <Spinner height='80px' width='80px' thickness="5px"  color="secondaryColor" emptyColor="defaultColor"/>
      </Flex>
    );
  }
  return (
    <Flex display='column'>
      <Flex>
        <Heading size="lg">Puntos de Carga</Heading>
        <Spacer />
        <Link as={NavLink} to={"/usuario/crear-punto-carga"}>
          <Button
            bg={"defaultColor"}
            color={"whiteColor"}
            _hover={{ bg: "secondaryColor", color: "defaultColor" }}
          >
            CREAR PUNTO DE CARGA
          </Button>
        </Link>
      </Flex>
      <Divider my={5} />
      <Grid display={"flex"} gap={6} flexWrap={"wrap"} justifyContent={{base:'center', md:'start'}}>
        {spots.map((spot) => {
          return <AdminSpotCard spot={spot} key={spot._id}/>;
        })}
      </Grid>
    </Flex>
  );
};

export default AdminSpots;
