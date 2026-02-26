import { Button, ButtonGroup, CardBody, CardFooter, Flex, Text } from "@chakra-ui/react"
import { Bolt, ElectricalServices, Euro, EvStation } from "@mui/icons-material"
import PropTypes from "prop-types";

const AdminSpotCardInfo = ({ spot, setShowInfo, setShowUpdate, setShowDeleteAlert }) => {
    const getBadgeColor = (spotState) => {
        switch(spotState) {
          case "Libre":
            return "secondaryColor";
          case "Ocupado":
            return "redColor";
          case "Fuera de Servicio":
            return "orangeColor";
          default:
            return "secondaryColor";
        }
      }
    const badgeColor = getBadgeColor(spot.state);

    const handleUpdateClick = () => {
        setShowInfo(false);
        setShowUpdate(true);
    }
    const handleDeleteAlertClick = () => {
      setShowInfo(false);
      setShowDeleteAlert(true);
    }

  return (
    <>
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        bg="grayColor"
      >
        <Flex direction={"column"}>
          <Flex>
            <Bolt />
            <Text>Potencia: {spot.power}</Text>
          </Flex>
          <Flex>
            <ElectricalServices />
            <Text>Tipo: {spot.type}</Text>
          </Flex>
          <Flex>
            <Euro />
            <Text>Tarifa: {spot.rate} kW/h</Text>
          </Flex>
          <Flex>
            <EvStation />
            <Text>En una estación: {spot.station ? "SI" : "NO"}</Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text color={badgeColor} textTransform="uppercase" fontWeight={600}>
            {spot.state}
          </Text>
        </Flex>
      </CardBody>
      <CardFooter display='flex' alignItems='center' justifyContent='center' px={1}>
        <ButtonGroup>
          <Button
            bg={"lightColor"}
            color={"defaultColor"}
            _hover={{ bg: "secondaryColor", color: "defaultColor" }}
            onClick={handleUpdateClick}
          >
            EDITAR
          </Button>
          <Button
            variant="ghost"
            color={"redColor"}
            _hover={{ bg: "redColor", color: "whiteColor" }}
            onClick={handleDeleteAlertClick}
          >
            BORRAR
          </Button>
        </ButtonGroup>
      </CardFooter>
    </>
  );
}
AdminSpotCardInfo.propTypes = {
    spot: PropTypes.object,
    setShowInfo: PropTypes.func,
    setShowUpdate: PropTypes.func,
    setShowDeleteAlert: PropTypes.func
}

export default AdminSpotCardInfo