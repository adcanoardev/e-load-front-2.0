import { Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";

const AboutInnovation = () => {
    const icons = [
        {
            src: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686648365/e-load/users-green_ni4b5s.png",
            alt: "Icono 1",
            text: "Simple",
            textDescription: "Fácil de acceder, comprender y controlar.",
        },
        {
            src: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686648365/e-load/intelligent-green_pxzcx7.png",
            alt: "Icono 2",
            text: "Inteligente",
            textDescription: "Siempre conectado, contigo y con tu vida.",
        },
        {
            src: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686648365/e-load/simple-green_xixvvg.png",
            alt: "Icono 3",
            text: "Centrado en el usuario",
            textDescription: "Diseñado para la gente real, intuitivo y con una estética muy cuidada.",
        },
    ];

    return (
        <Flex h={{ base: "auto", md: "400px" }} justifyContent="center" flexDirection="column" mb={20}>
            <Flex justifyContent="center">
                <Heading
                    textAlign={"center"}
                    alignContent="center"
                    fontWeight={620}
                    fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
                    lineHeight={"140%"}
                    mb={10}
                    color="blackColor"
                >
                    Nuestros principios de innovación
                </Heading>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={10} justifyContent="center" alignItems="center" flexWrap="wrap">
                    {icons.map((icon) => (
                        <Stack key={icon.alt} alignItems="center" spacing={4}>
                            <Image src={icon.src} alt={icon.alt} boxSize={20} justifyContent="center" />
                            <Text color="defaultColor" maxW={"4xl"} fontWeight="bold" fontSize={20} mt={4}>
                                {icon.text}
                            </Text>
                            <Text color="defaultColor" fontSize={14} textAlign={"center"}>
                                {icon.textDescription}
                            </Text>
                        </Stack>
                    ))}
                </Stack>
            </Flex>
        </Flex>
    );
};

export default AboutInnovation;
