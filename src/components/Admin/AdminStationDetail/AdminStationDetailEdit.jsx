import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateStation } from "../../../redux/stations/stations.actions";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/layout";
import { Done } from "@mui/icons-material";
import { useSelector } from "react-redux";

const AdminStationDetailEdit = () => {
    const { stationSelected } = useSelector((state) => state.stations);
  const { register, handleSubmit } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(0);
  const toast = useToast();
  const onSubmit = (dataStation) => {
    if(isUpdateMode === 2){
    updateStation(stationSelected._id, dataStation);
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
          Estación actualizada correctamente.
        </Box>
      ),
    });
    setIsUpdateMode(0);
    }
  };
  const handleEditMode = () => {
    setIsUpdateMode(isUpdateMode + 1);
    setIsEditMode(!isEditMode);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display="flex" alignItems="center" gap={3}>
        {isEditMode && (
          <Select
            {...register("schedule")}
            width={200}
            defaultValue={"Selecciona una opción"}
          >
            <option disabled value="Selecciona una opción">
              Selecciona una opción
            </option>
            <option value="10:00 - 22:00">10:00 - 22:00</option>
            <option value="24 Horas">24 Horas</option>
            <option value="Cerrada">Cerrada</option>
          </Select>
        )}
        <Button
          type="submit"
          bg={"defaultColor"}
          color={"whiteColor"}
          _hover={{ bg: "secondaryColor", color: "defaultColor" }}
          onClick={handleEditMode}
        >
          {isEditMode ? "GUARDAR" : "EDITAR"}
        </Button>
      </FormControl>
    </form>
  );
};

export default AdminStationDetailEdit;