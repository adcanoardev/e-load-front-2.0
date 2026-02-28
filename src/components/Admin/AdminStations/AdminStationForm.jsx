import { useForm } from "react-hook-form";
import { createStation } from "../../../redux/stations/stations.actions";
import PropTypes from "prop-types";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Spacer, useToast } from "@chakra-ui/react";
import { Done } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminStationForm = ({ selectedCoordinates }) => {
    const { register, handleSubmit, reset } = useForm();
    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = (dataStation) => {
        createStation(
            {
                ...dataStation,
                coordinatesLat: selectedCoordinates.lat,
                coordinatesLng: selectedCoordinates.lng,
            },
            navigate,
        );

        reset();

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
                    Estación Creada: Datos registrados correctamente.
                </Box>
            ),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Flex direction="column" gap={3}>
                    <FormLabel>Coordenadas</FormLabel>
                    <Flex gap={3}>
                        <Input
                            placeholder="Latitud"
                            disabled
                            value={selectedCoordinates ? selectedCoordinates.lat : ""}
                        />
                        <Input
                            placeholder="Longitud"
                            disabled
                            value={selectedCoordinates ? selectedCoordinates.lng : ""}
                        />
                    </Flex>

                    <Input {...register("address")} placeholder="Dirección" maxLength={80} />

                    <Flex display="flex" alignItems="center">
                        <FormLabel>Horario</FormLabel>
                        <Select {...register("schedule")} width={200} defaultValue={"Opción"}>
                            <option disabled value="Opción">
                                Opción
                            </option>
                            <option value="10:00 - 22:00">10:00 - 22:00</option>
                            <option value="24 Horas">24 Horas</option>
                            <option value="Cerrada">Cerrada</option>
                        </Select>

                        <Spacer />
                        <Button
                            type="submit"
                            bg={"defaultColor"}
                            color={"whiteColor"}
                            _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                        >
                            GUARDAR
                        </Button>
                    </Flex>
                </Flex>
            </FormControl>
        </form>
    );
};

AdminStationForm.propTypes = {
    isEditing: PropTypes.bool,
    selectedCoordinates: PropTypes.object,
};

export default AdminStationForm;
