import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Routing from './components/Routing/Routing';
import { checkSession } from './redux/users/users.actions';
import { Box, Flex } from '@chakra-ui/react';

function App() {
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			checkSession();
		}
		window.scrollTo(0, 0);

	}, [location]);

	return (
		<Flex direction="column" minH="100vh">
			<Header />
			<Box flex="1" pt="80px">
				<Routing />
			</Box>
			<Footer />
		</Flex>
	);
}

export default App;
