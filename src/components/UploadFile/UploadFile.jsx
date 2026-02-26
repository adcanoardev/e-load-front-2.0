import { FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
const UploadFile = ({ register, funcion }) => {
    return (
        <FormLabel htmlFor="file-input">
            <Input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
                {...register("image")}
                onChange={funcion}
            />
        </FormLabel>
    );
};
UploadFile.propTypes = {
    register: PropTypes.func,
    funcion: PropTypes.func,
};

export default UploadFile;
