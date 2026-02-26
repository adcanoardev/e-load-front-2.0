import { Box, Button, ButtonGroup, CardBody, CardFooter, Flex, Text, useToast } from "@chakra-ui/react"
import { Done } from "@mui/icons-material";
import PropTypes from "prop-types";
import { deleteSpot, getAllSpots } from "../../../redux/spots/spots.actions";

const AdminSpotCardDeleteAlert = ({ spot, setShowInfo, setShowDeleteAlert }) => {
  const toast = useToast();

    const handleInfoClick = () => {
        setShowDeleteAlert(false);
        setShowInfo(true);
      };

      const onSubmit = async () => {
        await deleteSpot(spot._id);
        getAllSpots();
        toast({
          status: "success",
          duration: 3000,
          isClosable: true,
          render: () => (
            <Box
              bg="secondaryColor"
              color="defaultColor"
              p={3}
              borderRadius="md"
              alignItems="center"
              display="flex"
            >
              <Done />
              Punto de Carga eliminado correctamente.
            </Box>
          ),
        });
      };
  return (
    <>
      <CardBody display={"flex"} alignItems="center" bg="grayColor">
        <Flex>
          <Text textAlign="center">
            ¿Seguro que quieres borrar este Punto de Carga?
          </Text>
        </Flex>
      </CardBody>
      <CardFooter
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={1}
      >
        <ButtonGroup>
          <Button
            variant="ghost"
            color={"redColor"}
            _hover={{ bg: "redColor", color: "whiteColor" }}
            onClick={onSubmit}
          >
            SI
          </Button>
          <Button
            bg={"lightColor"}
            color={"defaultColor"}
            _hover={{ bg: "secondaryColor", color: "defaultColor" }}
            onClick={handleInfoClick}
          >
            NO
          </Button>
        </ButtonGroup>
      </CardFooter>
    </>
  );
}
AdminSpotCardDeleteAlert.propTypes = {
    spot: PropTypes.object,
    setShowInfo: PropTypes.func,
    setShowDeleteAlert: PropTypes.func
}

export default AdminSpotCardDeleteAlert