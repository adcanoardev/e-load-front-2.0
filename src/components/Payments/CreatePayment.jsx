import { useState } from "react";
import { FormControl, FormLabel, Input, Button, Flex, useToast, Box } from "@chakra-ui/react";
import { createPayment } from "../../redux/payments/payments.actions";
import { useForm } from "react-hook-form";
import { Done } from "@mui/icons-material";
import PropTypes from "prop-types";

const CreatePayment = ({ user }) => {
    const { register, handleSubmit, reset } = useForm();
    const [paymentCreated, setPaymentCreated] = useState(false);
    const toast = useToast();

    const onSubmit = (dataPayment) => {
        createPayment(dataPayment, user._id);
        setPaymentCreated(true);
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
                    Método de Pago: Datos registrados correctamente.
                </Box>
            ),
        });
    };

    const handleCreatePaymentClick = () => {
        setPaymentCreated(true);
    };

    return (
        <Flex direction={"column"}>
            <Button onClick={handleCreatePaymentClick} mb={3}>
                Agregar método de pago
            </Button>
            {paymentCreated && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>NOMBRE Y APELLIDOS</FormLabel>
                            <Input type="text" {...register("cardHolderName")} />
                            <FormLabel>Nº TARJETA</FormLabel>
                            <Input {...register("number")} minLength={16} maxLength={16} />

                            <Flex justifyContent={"space-between"}>
                                <Flex direction={"column"} width={20}>
                                    <FormLabel>MES</FormLabel>
                                    <Input {...register("valMonth")} minLength={2} maxLength={2} />
                                </Flex>
                                <Flex direction={"column"} width={20}>
                                    <FormLabel>AÑO</FormLabel>
                                    <Input {...register("valYear")} minLength={2} maxLength={2} />
                                </Flex>
                            </Flex>
                            <Button
                                my={3}
                                type="submit"
                                bg={"defaultColor"}
                                color={"whiteColor"}
                                _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                            >
                                Guardar
                            </Button>
                        </FormControl>
                    </form>
                </>
            )}
        </Flex>
    );
};
CreatePayment.propTypes = {
    user: PropTypes.object,
};

export default CreatePayment;
