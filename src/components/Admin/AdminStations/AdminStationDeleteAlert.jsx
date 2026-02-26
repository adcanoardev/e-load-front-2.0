import { useRef } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useToast,
    Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Done } from "@mui/icons-material";
import { deleteStation } from "../../../redux/stations/stations.actions";
import { Link } from "react-router-dom";

const AdminStationDeleteAlert = ({ isOpen, onClose, station, isAdminStationDetail }) => {
    const cancelRef = useRef();
    const toast = useToast();
    const handleDeleteStation = async () => {
        await deleteStation(station._id);
        onClose();
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
                    Estación Eliminada: Comentarios Eliminados.
                </Box>
            ),
        });
    };

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <p>Borrar Estación</p>
                        <p>{station.address}</p>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <p>¿Estás seguro de querer eliminar la estación?</p>
                        <p>
                            <b>No</b> se eliminarar los puntos de carga, pero <b>SI</b> los comentarios de los usuarios.
                        </p>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        {isAdminStationDetail ? (
                            <Link to="/usuario/estaciones">
                                <Button
                                    bg={"redColor"}
                                    color={"whiteColor"}
                                    _hover={{ bg: "redColor", color: "whiteColor" }}
                                    onClick={() => handleDeleteStation()}
                                    ml={3}
                                >
                                    BORRAR
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                bg={"redColor"}
                                color={"whiteColor"}
                                _hover={{ bg: "redColor", color: "whiteColor" }}
                                onClick={() => handleDeleteStation()}
                                ml={3}
                            >
                                BORRAR
                            </Button>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
AdminStationDeleteAlert.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    station: PropTypes.object,
    isAdminStationDetail: PropTypes.bool,
};

export default AdminStationDeleteAlert;
