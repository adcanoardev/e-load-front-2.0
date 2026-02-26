import { Divider, Flex, Heading } from '@chakra-ui/react';
import RegEditForm from '../RegEditForm/RegEditForm';

const PersonalInformation = () => {
	return (
		<Flex direction="column" alignItems="center" justify={{base: 'center', md: 'auto'}} minWidth={{ base: '100%', md: 'calc(100% - 260px)'}}>
			<Flex>
				<Heading size="lg">Información Personal</Heading>
			</Flex>
			<Divider my={5} />
			<RegEditForm />
		</Flex>
	);
};

export default PersonalInformation;