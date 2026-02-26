import { Stack, Divider, Text, Image } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const NavBarMobile = ({onLinkClick}) => {
	const location = useLocation();

	return (
		<Stack pt={'50px'} spacing={4} textAlign="center" alignItems={'center'}>
			<Link to="/" onClick={onLinkClick}>
				<Image
					src="https://res.cloudinary.com/dgkm71mjf/image/upload/v1686469078/e-load/e-load-logo_m7r1jg.png"
					alt="Logo de la empresa"
					height={7}
				/>
			</Link>
			<Divider borderColor="whiteColor" pt={20}/>
			<Link to="/"  onClick={onLinkClick}>
				<Text color={location.pathname === '/' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Inicio
				</Text>
			</Link>
			<Divider borderColor="whiteColor" />
			<Link to="/mapa" onClick={onLinkClick}>
				<Text color={location.pathname === '/mapa' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Mapa
				</Text>
			</Link>
			<Divider borderColor="whiteColor" />
			<Link to="/sobre-nosotros" onClick={onLinkClick}>
				<Text color={location.pathname === '/sobre-nosotros' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Sobre Nosotros
				</Text>
			</Link>
			<Divider borderColor="whiteColor" />
			<Link to="/contacto" onClick={onLinkClick}>
				<Text color={location.pathname === '/contacto' ? 'secondaryColor' : 'inherit'} _hover={{ color: 'secondaryColor' }}>
					Contacto
				</Text>
			</Link>
		</Stack>
	);
};

export default NavBarMobile;
