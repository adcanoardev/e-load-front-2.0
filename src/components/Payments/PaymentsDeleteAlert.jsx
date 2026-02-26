import { Box, Button, ButtonGroup, CardBody, CardFooter, Flex, Text, useToast } from "@chakra-ui/react";
import { Done } from "@mui/icons-material";
import PropTypes from "prop-types";
import { deletePayment, getAllPaymentsByUser } from "../../redux/payments/payments.actions";
import { useSelector } from "react-redux";

const PaymentsDeleteAlert = ({ payment, setShowInfo, setShowDeleteAlert }) => {
    const { user } = useSelector((state) => state.users);
    const toast = useToast();

    const handleInfoClick = () => {
        setShowDeleteAlert(false);
        setShowInfo(true);
    };

    const onSubmit = async () => {
        await deletePayment(payment._id);
        // if(user.payments){
        getAllPaymentsByUser(user._id);
        // }
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
                    Método de pago eliminado correctamente.
                </Box>
            ),
        });
    };
    return (
        <>
            <CardBody display={"flex"} alignItems="center" bg="grayColor">
                <Flex>
                    <Text textAlign="center">¿Seguro que quieres borrar este Método de Pago?</Text>
                </Flex>
            </CardBody>
            <CardFooter display="flex" alignItems="center" justifyContent="center" px={1}>
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
};
PaymentsDeleteAlert.propTypes = {
    payment: PropTypes.object,
    setShowInfo: PropTypes.func,
    setShowDeleteAlert: PropTypes.func,
};

export default PaymentsDeleteAlert;
