import { Grid } from "@chakra-ui/react";
import PaymentMethodCard from "./PaymentMethodCard";
import PropTypes from "prop-types";

const PaymentMethods = ({ payments }) => {
    return (
        <Grid display={"flex"} gap={6} flexWrap={"wrap"}>
            {payments.map((payment) => {
                return <PaymentMethodCard payment={payment} key={payment._id} />;
            })}
        </Grid>
    );
};
PaymentMethods.propTypes = {
    payments: PropTypes.array,
};

export default PaymentMethods;
