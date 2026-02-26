import { Box, chakra, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomeSectionStations = () => {
    return (
        <Box
            maxW="100%"
            h="70vh"
            bgColor="whiteColor"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <chakra.h3 textAlign="center" fontSize="5xl" fontWeight="bold" mb={2} color="blackColor">
                ¿Quieres descubrir dónde están nuestras estaciones?
            </chakra.h3>
            <Link to="/mapa">
                <Button
                    type="submit"
                    bg="defaultColor"
                    color="whiteColor"
                    _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                    size="lg"
                    marginTop={10}
                >
                    DESCUBRIR
                </Button>
            </Link>
        </Box>
    );
};

export default HomeSectionStations;
