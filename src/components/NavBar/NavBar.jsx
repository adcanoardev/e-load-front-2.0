import { Flex, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
	const location = useLocation();

	return (
		<>
			<Link to="/">
				<Text color={location.pathname === '/' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Inicio
				</Text>
			</Link>
			<Link to="/mapa">
				<Text color={location.pathname === '/mapa' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Mapa
				</Text>
			</Link>
			<Link to="/sobre-nosotros">
				<Text color={location.pathname === '/sobre-nosotros' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Sobre Nosotros
				</Text>
			</Link>
			<Link to="/contacto">
				<Text color={location.pathname === '/contacto' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Contacto
				</Text>
			</Link>
		</>
	);
};

export default NavBar;
