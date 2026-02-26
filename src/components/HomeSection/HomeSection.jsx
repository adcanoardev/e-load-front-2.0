import { Stack, Flex, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const HomeSection = () => {
    const MotionText = motion(Text);

    return (
        <Flex w={"full"} h={"100vh"} position={"relative"} overflow={"hidden"}>
            <Flex w={"full"} h={"full"} position={"absolute"} top={0} left={0} zIndex={-1}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                >
                    <source
                        src="https://res.cloudinary.com/dgkm71mjf/video/upload/v1686474818/e-load/e-load-section-01_hq4smf.mp4"
                        type="video/mp4"
                    />
                </video>
            </Flex>
            <VStack
                w={"full"}
                justify={"center"}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
            >
                <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
                    <MotionText
                        color="whiteColor"
                        fontWeight={500}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 4, delay: 2 }}
                    >
                        FIND
                        <Text as="span" color="secondaryColor">
                            /
                        </Text>
                    </MotionText>

                    <MotionText
                        color="whiteColor"
                        fontWeight={500}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 5, delay: 3 }}
                    >
                        CHARGE
                        <Text as="span" color="secondaryColor">
                            /
                        </Text>
                    </MotionText>
                    <MotionText
                        color="whiteColor"
                        fontWeight={500}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 6, delay: 4 }}
                    >
                        GO
                        <Text as="span" color="secondaryColor">
                            /
                        </Text>
                    </MotionText>

                    <MotionText
                        color="whiteColor"
                        fontWeight={100}
                        lineHeight={1.5}
                        fontSize={useBreakpointValue({ base: "6xl", md: "2xl" })}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 7, delay: 5 }}
                    >
                        Conduce hasta cualquier lugar.
                    </MotionText>
                </Stack>
            </VStack>
        </Flex>
    );
};
export default HomeSection;
