import { Card, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import PaymentsMethodsInfo from "./PaymentsMethodsInfo";
import PaymentsDeleteAlert from "./PaymentsDeleteAlert";

const PaymentMethodCard = ({ payment }) => {
    const [showInfo, setShowInfo] = useState(true);
    const [showAlertDelete, setShowDeleteAlert] = useState(false);
    return (
        <GridItem key={payment._id} width={320}>
            <Card border="1px solid" borderColor="grayColor">
                {/* <CardHeader
          margin={0}
          py={1}
          display="flex"
          justifyContent="center"
        >
        </CardHeader> */}
                {showInfo && (
                    <PaymentsMethodsInfo
                        payment={payment}
                        setShowInfo={setShowInfo}
                        setShowDeleteAlert={setShowDeleteAlert}
                    />
                )}
                {showAlertDelete && (
                    <PaymentsDeleteAlert
                        payment={payment}
                        setShowInfo={setShowInfo}
                        setShowDeleteAlert={setShowDeleteAlert}
                    />
                )}
            </Card>
        </GridItem>
    );
};
PaymentMethodCard.propTypes = {
    payment: PropTypes.object,
};

export default PaymentMethodCard;
