import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Select, Spinner, useToast } from "@chakra-ui/react"
import { Done } from "@mui/icons-material";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { getAllStations } from "../../../redux/stations/stations.actions";
import { useSelector } from "react-redux";
import { createSpot } from "../../../redux/spots/spots.actions";

const AdminSpotCreate = () => {
    const { loading, stations } = useSelector((state) => state.stations);
    const { register, handleSubmit, reset } = useForm();
    const toast = useToast();
    useEffect(() => {
        getAllStations();
    }, []);
    if (loading || !stations) {
        return (
          <Flex justify="center" align="center" width='100%' height="100vh">
            <Spinner height='80px' width='80px' thickness="5px"  color="secondaryColor" emptyColor="defaultColor"/>
          </Flex>
        );
      }
    const onSubmit = (dataSpot) => {
        createSpot(dataSpot);
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
                alignItems='center'
                display='flex'
              >
                <Done/>
                Punto de Carga creado: Datos registrados correctamente.
              </Box>
            )
          });
    }
  return (
    <Flex direction='column' width='100%'>
        <Heading size='lg'>Crear Punto de Carga</Heading>
        <Divider my={5}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
            <Flex gap={10}>               
                <Flex width={200} direction='column' gap={3}>
                    <Flex alignItems='center' justifyContent={"space-between"}>
                        <FormLabel>Potencia</FormLabel>
                        <Select
                            {...register("power")}
                            width={200}
                            defaultValue={'Opción'}
                        >
                            <option  disabled value="Opción">Opción</option>
                            <option value="2.3 kW">2.3 kW</option>
                            <option value="3.7 kW">3.7 kW</option>
                            <option value="7.4 kW">7.4 kW</option>
                            <option value="11 kW">11 kW</option>
                            <option value="22 kW">22 kW</option>
                            <option value="43 kW">43 kW</option>
                            <option value="50 kW">50 kW</option>
                        </Select>
                    </Flex>
                    <Flex alignItems='center' justifyContent={"space-between"}>
                        <FormLabel>Tipo</FormLabel>
                        <Select
                            {...register("type")}
                            width={200}
                            defaultValue={'Opción'}
                        >
                            <option  disabled value="Opción">Opción</option>
                            <option value="CHAdeMO">CHAdeMO</option>
                            <option value="CCS2">CCS2</option>
                            <option value="Type2">Type2</option>
                            <option value="Schuko">Schuko</option>
                        </Select>
                    </Flex>
                    <Flex alignItems='center' justifyContent={"space-between"}>
                        <FormLabel>Tarifa (€/kWh)</FormLabel>
                        <Input
                            {...register("rate")}
                            placeholder="0.0"
                            maxLength={6}
                            width={20}
                        />
                    </Flex>
                    <Flex alignItems='center' justifyContent={"space-between"}>
                        <FormLabel>Estado</FormLabel>
                        <Select
                            {...register("state")}
                            width={200}
                            defaultValue={'Opción'}
                        >
                            <option disabled value="Opción">Opción</option>
                            <option value="Libre">Libre</option>
                            <option value="Ocupado">Ocupado</option>
                            <option value="Fuera de Servicio">Fuera de Servicio</option>
                        </Select>
                    </Flex>
                    <Button type="submit" bg={'defaultColor'} color={'whiteColor'} _hover={{bg: "secondaryColor", color:"defaultColor"}}>
                        GUARDAR
                    </Button>
                </Flex>
                <Flex direction={"column"}>            
                    <FormLabel>Estación</FormLabel>
                    <Divider mb={3}/>
                    <Select
                        {...register("station")}
                        defaultValue={'Dirección'}
                    >
                        <option disabled value="Dirección">Dirección</option>
                        {stations.map((station) => {
                            return (                              
                                <option key={station._id} value={station._id}>{station.address}</option>
                            )
                        })}                        
                    </Select>
                </Flex>
            </Flex>
            </FormControl>
        </form>
    </Flex>
  )
}

export default AdminSpotCreate