import NavBar from "../NavBar/NavBar";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Flex,
    Stack,
    Image,
    Text,
} from "@chakra-ui/react";
import LoginForm from "../LoginForm/LoginForm";
import { useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { logout } from "../../redux/users/users.actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuMobile from "../MenuMobile/MenuMobile";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    const { user } = useSelector((state) => state.users);

    return (
        <Box
            width="100%"
            color="whiteColor"
            bg="defaultColor"
            minH="80px"
            py={{ base: 2 }}
            position="fixed"
            zIndex={999}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle="solid"
            borderColor="defaultColor"
            align="center"
        >
            <Flex
                h={16}
                alignItems="center"
                textAlign={"center"}
                justifyContent={{ base: "space-between", md: "space-between" }}
            >
                <Box pl={4} display={{ base: "flex", md: "none" }}>
                    <MenuMobile />
                </Box>
                <Box>
                    <Link to="/">
                        <Image
                            src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469078/e-load/e-load-logo_m7r1jg.png"
                            alt="Logo de la empresa"
                            height={7}
                            pl={{ base: "50px", md: "20px" }}
                        />
                    </Link>
                </Box>
                <Box>
                    <Flex display={{ base: "none", md: "flex" }} justify="center" alignItems="center" gap={4}>
                        <NavBar />
                    </Flex>
                </Box>
                {user ? (
                    <ProfileMenu onClose={onClose} logout={handleLogout} />
                ) : (
                    <>
                        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={4}>
                            <Text
                                onClick={onOpen}
                                cursor="pointer"
                                color="whitetColor"
                                fontSize="sm"
                                fontWeight={700}
                                textDecor="underline"
                                _hover={{ color: "secondaryColor" }}
                                pt={2}
                            >
                                Login
                            </Text>

                            <Link to="/registro">
                                <Button
                                    display={{ base: "none", md: "inline-flex" }}
                                    p={2}
                                    bg="whiteColor"
                                    color="defaultColor"
                                    fontSize="sm"
                                    fontWeight={600}
                                    _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                                >
                                    Registrarse
                                </Button>
                            </Link>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    boxShadow="0 0 10px #010f20"
                                    top="3%"
                                    borderRadius={6}
                                >
                                    <ModalHeader bg="defaultColor" w="100%" textAlign="center" color="whiteColor">
                                        <Flex display="flex" justifyContent="center">
                                            <Image
                                                src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469078/e-load/e-load-logo_m7r1jg.png"
                                                alt="Login"
                                                height={7}
                                            />
                                        </Flex>
                                    </ModalHeader>
                                    <ModalCloseButton
                                        onClick={onClose}
                                        color="whiteColor"
                                        borderRadius={0}
                                        boxShadow="0 0 0 #010f20"
                                    />
                                    <ModalBody>
                                        <LoginForm onClose={onClose} />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Stack>
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default Header;
