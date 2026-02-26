import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    useColorModeValue,
    Image,
    Heading,
    Flex,
    Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Flex
            bg={useColorModeValue("defaultColor")}
            color={useColorModeValue("whiteColor")}
            sx={{
                left: 0,
                bottom: 0,
                width: "100%",
            }}
            justify={{ base: "center", md: "auto" }}
            alignItems="center"
            direction="column"
            textAlign={"center"}
        >
            <Container as={Stack} maxW={"6xl"} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack alignSelf={{ base: "center", md: "flex-start" }}>
                        <Heading fontSize="2xl">Asistencia</Heading>
                        <Divider my={5} />
                        <Text>Lunes a jueves: 9:00 - 18:30</Text>
                        <Text>Viernes: 9:00 - 15:00</Text>
                        <Text>Fines de semana y festivos:</Text>
                        <Text>Sin atención al cliente</Text>
                        <Text>Llamar: 91 078 07 11</Text>
                        <Text>Correo electrónico:</Text>
                        <Text>contacto@e-load.es</Text>
                    </Stack>
                    <Stack alignSelf={{ base: "center", md: "flex-start" }}>
                        <Heading fontSize="2xl">Compañia</Heading>
                        <Divider my={5} />
                        <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                        <Link to="/contacto">Contacto</Link>
                        <Link to="/mapa">Puntos de carga</Link>
                    </Stack>

                    <Stack alignSelf={{ base: "center", md: "flex-start" }}>
                        <Heading fontSize="2xl">Legal</Heading>
                        <Divider my={5} />
                        <Link href={"#"}>Cookies</Link>
                        <Link href={"#"}>Politica de privacidad</Link>
                    </Stack>

                    <Stack alignItems={"center"}>
                        <Heading alignSelf={{ base: "center", md: "start" }} fontSize="2xl">
                            Instala nuestra App
                        </Heading>
                        <Divider my={5} />
                        <Stack gap={5} alignItems={"center"}>
                            <Image
                                alt="image-appstore"
                                src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686482925/e-load/app-store_zfrjug.png"
                                position="relative"
                                maxWidth="45%"
                            />
                            <Image
                                alt="image-googlePlay"
                                src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686482925/e-load/play-store_wwa4f0.png"
                                position="relative"
                                maxWidth="45%"
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Box>
                <Container
                    as={Stack}
                    maxW={"6xl"}
                    py={2}
                    direction={{ base: "column", md: "column" }}
                    spacing={2}
                    justify={{ base: "center", md: "space-between" }}
                    align={{ base: "center", md: "center" }}
                    pb={6}
                >
                    <Stack direction={"row"} spacing={2} marginBottom={1}>
                        <Box>
                            <Link to="https://www.linkedin.com">
                                <Image
                                    src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686585674/e-load/linkedin-icono_xd4ov4.png"
                                    boxSize={8}
                                />
                            </Link>
                        </Box>

                        <Box>
                            <Link to="https://www.instagram.com">
                                <Image
                                    src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686585674/e-load/instagram-icono_ffe6g9.png"
                                    boxSize={8}
                                />
                            </Link>
                        </Box>

                        <Box>
                            <Link to="https://www.twitter.com">
                                <Image
                                    src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686585674/e-load/twitter-icono_uollna.png"
                                    boxSize={8}
                                />
                            </Link>
                        </Box>
                    </Stack>
                    <Text fontSize={"14px"} fontWeight={700}>
                        © 2023 E - LOAD. ALL RIGHTS RESERVED
                    </Text>
                </Container>
            </Box>
        </Flex>
    );
};

export default Footer;
