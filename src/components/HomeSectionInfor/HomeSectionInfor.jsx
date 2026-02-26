import { chakra, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const HomeSectionInfor = () => {

	const texts = [
		{
			number: "150.000",
			text: "Puntos de carga registrados",
		},
		{
			number: "250.000",
			text: "Miembros registrados",
		},
	];

	return (
		<Flex
			width="100%"
		    bgImage="url(https://res.cloudinary.com/dgkm71mjf/image/upload/v1686474622/e-load/e-load-section-04_bu0qnh.jpg)"
			bgSize="cover"
			bgPosition="center"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			paddingY={20}
			bgAttachment="fixed"
			h={{ base: "auto", md: "450px" }}
      
		>
			<Flex my={10} justifyContent="center" alignItems="center" gap={10} flexWrap="wrap"  mx={{ base: 10, md: 0 }}>
				{texts.map((item) => (
					<Text
         
						key={item.text}
						color="whiteColor"
						maxW="4xl"
						borderRadius="full"
						border="2px solid"
						borderColor="secondaryColor"
						p={4}
						pl={8}
						pr={8}
						fontWeight="bold"
						fontSize="2xl"
						textAlign="center"
					>
						{item.number} <br />
						{item.text}
					</Text>
				))}
			</Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
			<chakra.h3
       mb={8}
				textAlign="center"
				fontSize="4xl"
				fontWeight="bold"
				color="whiteColor"
			>
				¿Quieres formar parte de nuestra red?
			</chakra.h3>
			<Link to="/registro">
				<Button
					type="submit"
					bg="defaultColor"
					color="whiteColor"
					_hover={{ bg: "secondaryColor", color: "defaultColor" }}
					size="lg"
					borderRadius="full"
					py={3}
					px={6}
				>
					ENTRAR
				</Button>
			</Link>
      </Flex>
		</Flex>
	);
};

export default HomeSectionInfor;
