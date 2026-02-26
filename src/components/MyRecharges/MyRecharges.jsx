//import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotsByUser } from "../../redux/spots/spots.actions";
// import { getStationById } from '../../redux/stations/stations.actions'

const MyRecharges = () => {
    const { user } = useSelector((state) => state.users);
    const { spotsByUser } = useSelector((state) => state.spots);
    useEffect(() => {
        getSpotsByUser(user._id);
    }, [user._id]);

    // const getStationBySpotUser = (stationId) =>{
    //   getStationById(stationId);
    // }

    return (
        <Flex display="column">
            <Heading size="lg">Mis Recargas</Heading>
            <Divider my={5} />
            <Grid display={"flex"} gap={6} flexWrap={"wrap"} justifyContent={{ base: "center", md: "start" }}>
                {spotsByUser.map((spot) => {
                    {
                        /* if(spot.station){
          getStationBySpotUser(spot.station);
          } */
                    }
                    return (
                        <GridItem key={spot._id} w="320px">
                            <Card borderTopRadius={10}>
                                <CardHeader margin={0} padding={0}>
                                    <Image
                                        src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686470412/e-load/e-load-station-01_j4ecdf.png"
                                        alt="station"
                                        borderTopRadius={10}
                                        maxW="300px"
                                    />
                                </CardHeader>
                                <CardBody>
                                    {spot.date}
                                    {/* <Heading size="S">DIRECCION ESTACION</Heading> */}
                                    <Divider />
                                </CardBody>
                                {/* <CardFooter>
                  <Text>{spot.date}</Text>
                </CardFooter> */}
                            </Card>
                        </GridItem>
                    );
                })}
            </Grid>
        </Flex>
    );
};

export default MyRecharges;
