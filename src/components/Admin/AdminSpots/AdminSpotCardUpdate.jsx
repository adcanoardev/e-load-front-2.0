import {
    Box,
    Button,
    ButtonGroup,
    CardBody,
    CardFooter,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from "@chakra-ui/react";
import { Done } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { getAllSpots, updateSpot } from "../../../redux/spots/spots.actions";

const AdminSpotCardUpdate = ({ spot, setShowInfo, setShowUpdate }) => {
    const { register, handleSubmit } = useForm();
    const toast = useToast();

    const handleInfoClick = () => {
        setShowUpdate(false);
        setShowInfo(true);
    };

    const onSubmit = async (dataSpot) => {
        await updateSpot(spot._id, dataSpot);
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
                    Punto de Carga Actualizado: Datos registrados correctamente.
                </Box>
            ),
        });
    };
    return (
        <>
            <CardBody display={"flex"} flexDirection={"column"} justifyContent={"space-between"} bg="grayColor">
                <Flex direction={"column"}>
                    <form>
                        <FormControl>
                            <Flex alignItems="center" justifyContent={"space-between"}>
                                <FormLabel>Tarifa (€/kWh)</FormLabel>
                                <Input
                                    {...register("rate")}
                                    defaultValue={spot.rate}
                                    maxLength={6}
                                    width={20}
                                    bg={"whiteColor"}
                                />
                            </Flex>
                            <Flex alignItems="center" justifyContent={"space-between"}>
                                <FormLabel>Estado</FormLabel>
                                <Select {...register("state")} width={200} defaultValue={spot.state} bg={"whiteColor"}>
                                    <option disabled value="Opción">
                                        Opción
                                    </option>
                                    <option value="Libre">Libre</option>
                                    <option value="Ocupado">Ocupado</option>
                                    <option value="Fuera de Servicio">Fuera de Servicio</option>
                                </Select>
                            </Flex>
                        </FormControl>
                    </form>
                </Flex>
            </CardBody>
            <CardFooter display="flex" alignItems="center" justifyContent="center" px={1}>
                <ButtonGroup>
                    <Button
                        variant="ghost"
                        color={"defaultColor"}
                        _hover={{ bg: "lightColor", color: "defaultColor" }}
                        onClick={handleInfoClick}
                    >
                        CANCELAR
                    </Button>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        bg={"defaultColor"}
                        color={"whiteColor"}
                        _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                    >
                        GUARDAR
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </>
    );
};
AdminSpotCardUpdate.propTypes = {
    spot: PropTypes.object,
    setShowInfo: PropTypes.func,
    setShowUpdate: PropTypes.func,
};

export default AdminSpotCardUpdate;
