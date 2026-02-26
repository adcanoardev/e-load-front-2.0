import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";



const HomeSectionMobile = () => {

	const content = [
		{
			heading: "FIND",
			text: "Encuentra los puntos de recarga que mejor se adapten a tus necesidades allá donde vayas. Busca entre más de 150.000 puntos de carga.",
		},
		{
			heading: "PLUG",
			text:"Activa tu cargador de manera rápida y segura a través de nuestra práctica y eficiente app, obteniendo acceso a una amplia red de puntos de recarga en todo momento.",
		},
		{
			heading: "CHARGE",
			text: "Disfruta de una experiencia de carga fluida y sin preocupaciones. Encuentra los mejores puntos de recarga en cualquier momento y lugar.",
		},
	];


	return (
		<Box
			bgImage="url(https://res.cloudinary.com/dgkm71mjf/image/upload/v1686650269/e-load/e-load-charge_lrfwg8.jpg)"
			bgSize="cover"
			bgPosition="center"
			minWidth={{ base: "100%", md: "auto" }}
			minHeight="65vh"
		>
			<Stack minH={"65vh"} direction={{ base: "column", md: "row" }}>
				<Flex p={1} flex={1} justify={{ base: "center", md: "center" }} >
					<Stack
						p={5}
						spacing={50}
						w={"full"}
						maxW={{ base: "md", md: "2xl" }}
						align={"center"}
						direction={{ base: "column", md: "row" }}
					>
						{content.map((item) => (
							<Box
								borderRadius="20px"
								px={22}
								py={8}
								display="inline-block"
								bg="rgba(128, 128, 128, 0.7)"
								maxWidth={{ base: "80%" }}
								minWidth="205px"
								flex={1}
								key={item.heading}
							>
								<Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
									<Text
										as={"span"}
										position={"relative"}
										color="whiteColor"
										pb={2}
									>
										{item.heading}
										<Text as="span" color="secondaryColor">/</Text>
									</Text>
								</Heading>
								<Text fontSize={{ base: "md", lg: "lg" }} color="whiteColor" pt={4}>
									{item.text}
								</Text>
							</Box>
						))}
					</Stack>
				</Flex>
			</Stack>
		</Box>


	);
};









export default HomeSectionMobile;
