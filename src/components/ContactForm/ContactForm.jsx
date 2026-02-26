import { useState } from "react";
import {
    Input,
    Button,
    Textarea,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Stack,
    Heading,
    Text,
    Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
    const { handleSubmit } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const onSubmit = () => {
        setIsFormSubmitted(true);
        onOpen();
    };

    return (
        <Stack spacing={4} align="center" py={8} px={4} textAlign={"center"}>
            <Heading as="h2" size="xl" color={"defaultColor"}>
                Contacta con nosotros
            </Heading>
            <Divider my={5} />
            <Text textAlign="center" align="center" fontSize="l" pb={3} justify={"center"}>
                Para todo lo que necesites ponte en contacto con nosotros, estaremos encantados de atenderte.
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} width="100%" maxW="md">
                    <Input placeholder="Nombre" type="text" name="nombre" required />
                    <Input placeholder="Email" type="email" name="email" required />
                    <Select placeholder="Asunto" name="opcion" required>
                        <option>Reportar error</option>
                        <option>Contacto</option>
                        <option>Ayuda</option>
                    </Select>
                    <Textarea placeholder="Mensaje" name="mensaje" required />
                    <Button
                        type="submit"
                        bg={"defaultColor"}
                        color={"whiteColor"}
                        _hover={{ bg: "secondaryColor", color: "defaultColor" }}
                    >
                        Enviar Mensaje
                    </Button>
                </Stack>
            </form>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Formulario enviado con éxito</ModalHeader>
                    <ModalBody>
                        <Text>Tu mensaje ha sido enviado correctamente.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    );
};

export default ContactForm;
