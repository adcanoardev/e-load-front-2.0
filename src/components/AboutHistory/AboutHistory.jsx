import { Heading, Image, Text, Flex } from "@chakra-ui/react";

const AboutHistory = () => {
	const firstTexts = [
		"Surgió de la necesidad de abordar los desafíos ambientales",
		"y energéticos que enfrentamos. Inspirados por la creciente",
		"demanda de vehículos eléctricos, creamos una solución",
		"integral de estaciones de carga en toda España. Nuestro",
		"objetivo es impulsar la adopción masiva de la movilidad",
		"sostenible y contribuir al cuidado del planeta.",
	];

	const secondTexts = [
		"En E-LOAD, nuestro principal objetivo es impulsar la",
		"movilidad eléctrica en España. Con nuestra red de",
		"estaciones de carga estratégicas, ofrecemos a los",
		"conductores la libertad de recorrer el país sin",
		"preocupaciones de autonomía. Un futuro sostenible",
		"está en nuestras manos.",
	];

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			width="100%"
			pt={10}
		>
			<Flex
				direction="column"
				alignItems="center"
				my={{ base: 8, md: 0 }}
				alignContent="center"
				p={10}
			>
				<Heading fontSize={30} marginBottom={10}>
					Nuestra misión
				</Heading>

				{secondTexts.map((text, index) => (
					<Text key={index} justify={'center'} >{text}</Text>
				))}

				<video
					autoPlay
					loop
					muted
					style={{
						width: "50%",
						height: "auto",
						objectFit: "cover",
						marginTop: "10%",
					}}
				>
					<source
						src="https://res.cloudinary.com/dgkm71mjf/video/upload/v1686474818/e-load/e-load-section-01_hq4smf.mp4"
						type="video/mp4"
					/>
				</video>
			</Flex>

			<Flex
				alignContent="center"
				direction="column"
				alignItems="center"
				p={10}

			>

				<Image
					src="https://www.autopista.es/uploads/s1/55/35/11/6/5e5cdc3c0ee6948a1834961b-la-estacion-de-carga-para-electricos-mas-rapida-del-mundo-5-minutos-para-recorrer-100-km.jpeg"
					mt={4}
					objectFit="cover"
					w="50%"
					h="auto"
					alt="Estaciones de carga portátiles"
					marginBottom={8}
				/>

				<Heading fontSize={30} marginBottom={10} textAlign={'center'}>
					Nacimiento de E - LOAD
				</Heading>

				{firstTexts.map((text, index) => (
					<Text key={index} textAlign={'center'}>{text}</Text>
				))}
			</Flex>


		</Flex>
	);
};

export default AboutHistory;
