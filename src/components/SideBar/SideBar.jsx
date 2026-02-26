import { Flex, Link, Text, Divider } from '@chakra-ui/react';
import { AccountCircle, CreditCard, LocationOn, CardGiftcard, Error, ExitToApp, EvStationOutlined, ElectricalServices, People, ForumOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../redux/users/users.actions';

const SideBar = () => {
	const { user } = useSelector((state) => state.users);
	const location = useLocation();
	const userMenu = [
		{ title: 'Información Personal', url: '/usuario', icon: <AccountCircle fontSize="30px" /> },
		{ title: 'Métodos de Pago', url: '/usuario/metodos-de-pago', icon: <CreditCard fontSize="30px" /> },
		{ title: 'Mis Recargas', url: '/usuario/mis-recargas', icon: <LocationOn fontSize="30px" /> },
		{ title: 'Mis Puntos', url: '/usuario/mis-puntos', icon: <CardGiftcard fontSize="30px" /> },
		{ title: 'Reportar Error', url: '/usuario/reportar-error', icon: <Error fontSize="30px" /> }
	];

	const adminMenu = [
		{ title: 'Estaciones', url: '/usuario/estaciones', icon: <EvStationOutlined fontSize="30px" /> },
		{ title: 'Puntos de Carga', url: '/usuario/puntos-carga', icon: <ElectricalServices fontSize="30px" /> },
		{ title: 'Usuarios', url: '/usuario/usuarios', icon: <People fontSize="30px" /> },
		// { title: 'Comentarios', url: '/usuario/comentarios', icon: <ForumOutlined fontSize="30px" /> }
	];

	return (
		<Flex
			backgroundColor="grayColor"
			width="250px"
			padding="4"
			flexDirection="column"
		>
			{userMenu.map((menuOption) => (
				<Link as={NavLink} to={menuOption.url} display="block" pb={1} pt={1} key={menuOption.title}>
					<Flex
						alignItems="center"
						gap={2}
						p={3}
						borderRadius={5}
						bg={location.pathname === menuOption.url ? 'defaultColor' : 'inherit'} _hover={{ bg: 'defaultColor', color: 'whiteColor' }}
						color={location.pathname === menuOption.url ? 'whiteColor' : 'inherit'}
					>
						{menuOption.icon}
						<Text>{menuOption.title}</Text>
					</Flex>
				</Link>
			))}
			{user && user.rol === "admin" && (
				<>
					<Divider my={2} borderColor="defaultColor" />
					{adminMenu.map((menuOption) => (
						<Link as={NavLink} to={menuOption.url} display="block" pb={1} pt={1} key={menuOption.title}>
							<Flex
								alignItems="center"
								gap={2}
								p={3}
								borderRadius={5}
								bg={location.pathname === menuOption.url ? 'defaultColor' : 'inherit'} _hover={{ bg: 'defaultColor', color: 'whiteColor' }}
								color={location.pathname === menuOption.url ? 'whiteColor' : 'inherit'}
							>
								{menuOption.icon}
								<Text>{menuOption.title}</Text>
							</Flex>
						</Link>
					))}
				</>
			)}
			<Divider my={2} borderColor="defaultColor" />
			<Link as={NavLink} to='/' onClick={logout} display="block" pb={1} pt={1}>
				<Flex alignItems="center" gap={2} p={3} borderRadius={5} _hover={{ bg: 'defaultColor', color: 'whiteColor' }}>
					<ExitToApp fontSize="30px" />
					<Text textDecoration="none">Cerrar Sesión</Text>
				</Flex>
			</Link>
		</Flex>
	);
}

export default SideBar;
