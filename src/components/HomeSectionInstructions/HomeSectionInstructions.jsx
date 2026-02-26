import { Flex, Image, Text } from "@chakra-ui/react";

const HomeSectionInstructions = () => {
    const icons = [
        {
            src: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686647787/e-load/e-load-mockup-01_s5xn8f.png",
            alt: "mapa-responsive",
        },
        {
            src: "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686647784/e-load/e-load-mockup-02_ovlwem.png",
            alt: "station-responsive",
        },
    ];

    const textLines = ["HAZTE DE E-LOAD", "LA CIUDAD TE ESPERA"];

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            width="100%"
            minH={{ base: "400px", md: "500px" }}
            h={{ base: "auto", md: "500px" }}
        >
            <Flex direction="column" width="100%" justifyContent="center" alignItems="center" my={{ base: 8, md: 0 }}>
                {textLines.map((line, index) => (
                    <Text key={index} fontWeight={620} fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}>
                        {line}
                    </Text>
                ))}
            </Flex>
            <Flex width="100%" justifyContent="center" alignItems="center" flexWrap="wrap">
                {icons.map((icon) => (
                    <Image src={icon.src} alt={icon.alt} width="20%" height="auto" key={icon.alt} mx={10} />
                ))}
            </Flex>
        </Flex>
    );
};

export default HomeSectionInstructions;
