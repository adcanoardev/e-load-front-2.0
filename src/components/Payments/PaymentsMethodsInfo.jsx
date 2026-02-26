import { CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import { DeleteForever } from "@mui/icons-material";
import PropTypes from "prop-types";

const PaymentsMethodsInfo = ({ payment, setShowInfo, setShowDeleteAlert }) => {
    const hideCardNumber = (cardNumber) => {
        const hiddenNumber = "•".repeat(cardNumber.length - 4);
        const displayedNumber = hiddenNumber + cardNumber.slice(-4);
        return displayedNumber;
    };
    const handleDeleteAlertClick = () => {
        setShowInfo(false);
        setShowDeleteAlert(true);
    };
    //   const handleDeletePayment = (paymentId) => {
    //     // deletePayment(paymentId)
    //   }

    return (
        <>
            <CardHeader>
                <Heading size="lg">{hideCardNumber(payment.number)}</Heading>
            </CardHeader>
            <CardBody>
                <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
                    <Flex direction={"column"}>
                        <Text>{payment.cardHolderName}</Text>
                        <Text>
                            Válida hasta: {payment.valMonth}/{payment.valYear}
                        </Text>
                    </Flex>
                    <DeleteForever cursor={"pointer"} onClick={handleDeleteAlertClick} />
                </Flex>
            </CardBody>
        </>
    );
};
PaymentsMethodsInfo.propTypes = {
    payment: PropTypes.object,
    setShowInfo: PropTypes.func,
    setShowDeleteAlert: PropTypes.func,
};

export default PaymentsMethodsInfo;
