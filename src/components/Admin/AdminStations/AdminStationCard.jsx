import PropTypes from "prop-types";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Flex, GridItem, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import AdminStationDeleteAlert from "./AdminStationDeleteAlert";
import { AccessTime, Power } from "@mui/icons-material";

const AdminStationCard = ({ station }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GridItem key={station._id} w='250px'>
        <Card height={"350px"} border='1px solid' borderColor='grayColor'>
          <CardHeader margin={0} padding={0}>
            <Image src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686470412/e-load/e-load-station-02_xqi2zr.png" />
            <Divider />
          </CardHeader>
          <CardBody bg='grayColor' display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <Heading size='sm'>{station.address}</Heading>
            <Flex direction='column'>
              <Flex>
                <Power/>
                <Text fontSize='md'>Puestos de Carga: {station.spots.length}</Text> 
              </Flex>
              <Flex>
                <AccessTime/>
                <Text fontSize='md'>Horario: {station.schedule}</Text> 
              </Flex>
            </Flex>
          </CardBody>          
          <CardFooter>
            <ButtonGroup>
              <Link
                as={NavLink}
                to={`/usuario/estaciones-detalle/${station._id}`}
              >
                <Button
                  bg={"lightColor"}
                  color={"defaultColor"}
                  _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                >
                  VER
                </Button>
              </Link>
              <Button
                variant="ghost"
                color={"redColor"}
                _hover={{ bg: "redColor", color: "whiteColor" }}
                onClick={onOpen}
              >
                BORRAR
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </GridItem>
      {isOpen && <AdminStationDeleteAlert isOpen={isOpen} onClose={onClose} station={station} isAdminStationDetail/>}
    </>
  );
};
AdminStationCard.propTypes = {
  station: PropTypes.object
};
export default AdminStationCard;