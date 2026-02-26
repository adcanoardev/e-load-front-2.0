import ContactForm from '../../components/ContactForm/ContactForm';
import { Heading, Image, Box, Flex, Divider } from '@chakra-ui/react';

const ErrorReport = () => {
    return (
        <Flex direction={'column'} alignItems="center" justify={{base: 'center', md: 'auto'}} minWidth={{ base: '100%', md: 'calc(100% - 260px)'}}>
            <Heading as="h2" size="xl" mb={4} display="flex" justifyContent="center" alignItems="center">
                Reportar Error
            </Heading>
            <Divider my={5} />
            <Heading as="h3" size="md" mb={4} display="flex" justifyContent="center" alignItems="center" textAlign={'center'}>
                Si has tenido un problema, ponte en contacto con nosotros.
            </Heading>
            <ContactForm />
        </Flex>
    )
}

export default ErrorReport
