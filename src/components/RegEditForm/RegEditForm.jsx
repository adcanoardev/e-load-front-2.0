import { useState } from "react";
import { useSelector } from "react-redux";
import { FormLabel, Input, Button, Box, Avatar, Flex, FormControl, useToast } from "@chakra-ui/react";
import { updateUser } from "../../redux/users/users.actions";
import { DeleteForever, Done } from "@mui/icons-material";
import UploadFile from "../UploadFile/UploadFile";
import { useForm } from "react-hook-form";

const RegEditForm = () => {
    const [image, setImage] = useState(null);
    const defaultImage =
        "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469069/e-load/e-load-avatar_e0k9w4.png";
    const { user } = useSelector((state) => state.users);
    const toast = useToast();
    const { register, handleSubmit } = useForm();
    const onResetImage = () => {
        if (user.image !== "undefined") {
            setImage(user.image);
        } else {
            setImage(defaultImage);
        }
    };
    const onSubmit = (dataUser) => {
        updateUser(user._id, dataUser);
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
                    Usuario actualizado: Información actualizada correctamente.
                </Box>
            ),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Flex direction={{ base: "column", md: "row" }} gap={10} justify="center">
                    <Flex direction="column" width={"auto"} alignItems="center">
                        <Box mb={4}>
                            {image && <DeleteForever onClick={onResetImage} />}
                            {image || user.image !== "undefined" ? (
                                <Avatar size="2xl" src={image ? image : user.image} />
                            ) : (
                                <Avatar size="2xl" src={defaultImage} alt="User" />
                            )}
                        </Box>
                        <UploadFile
                            register={register}
                            funcion={(e) => {
                                setImage(URL.createObjectURL(e.target.files[0]));
                            }}
                        />
                    </Flex>
                    <Flex direction="column">
                        <FormLabel fontWeight={600}>Nombre de usuario</FormLabel>
                        <Input {...register("username")} defaultValue={user?.username || ""} isReadOnly />
                        <FormLabel fontWeight={600} pt={2}>
                            Nombre
                        </FormLabel>
                        <Input {...register("name")} defaultValue={user?.name || ""} />
                        <FormLabel fontWeight={600} pt={2}>
                            Apellidos
                        </FormLabel>
                        <Input {...register("surnames")} defaultValue={user?.surnames || ""} />
                        <FormLabel fontWeight={600} pt={2}>
                            Email
                        </FormLabel>
                        <Input {...register("email")} defaultValue={user?.email || ""} />
                        <FormLabel fontWeight={600} pt={2}>
                            Contraseña
                        </FormLabel>
                        <Input type="password" {...register("password")} defaultValue={user?.password || ""} />
                        <Button
                            alignSelf="start"
                            type="submit"
                            bg="defaultColor"
                            color="whiteColor"
                            _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                            mt={4}
                        >
                            Guardar
                        </Button>
                    </Flex>
                </Flex>
            </FormControl>
        </form>
    );
};

export default RegEditForm;
