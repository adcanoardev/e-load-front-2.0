import { Divider, Flex, Heading, Spinner } from "@chakra-ui/react";
import CreatePayment from "./CreatePayment";
import PaymentMethods from "./PaymentMethods";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPaymentsByUser } from "../../redux/payments/payments.actions";

const Payments = () => {
    const { loading, payments } = useSelector((state) => state.payments);
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
        if (user.payments) {
            getAllPaymentsByUser(user._id);
        }
    }, [user]);
    if (loading || !payments) {
        return (
            <Flex justify="center" align="center" width="100%" height="100vh">
                <Spinner height="80px" width="80px" thickness="5px" color="secondaryColor" emptyColor="defaultColor" />
            </Flex>
        );
    }
    return (
        <Flex display="column">
            <Heading size="lg">Métodos de Pago</Heading>
            <Divider my={5} />
            <Flex gap={6} display={{ md: "flex" }} alignItems={"flex-start"}>
                <CreatePayment user={user} />
                <PaymentMethods payments={payments} />
            </Flex>
        </Flex>
    );
};

export default Payments;
