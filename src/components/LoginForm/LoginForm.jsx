import { Link } from 'react-router-dom';
import { FormLabel, Input, Button, Text, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { login } from '../../redux/users/users.actions';
import PropTypes from "prop-types";

const LoginForm = ({ onClose }) => {
    const { register, handleSubmit } = useForm();
    const { error, user } = useSelector((state) => state.users);

    async function dataLogin(values) {
        await login(values);
        if (user) {
            onClose();
        }
    }

    return (
        <form
            onSubmit={handleSubmit(dataLogin)}
        >
            <FormLabel htmlFor="username" fontWeight={700}>Usuario</FormLabel>
            <Input
                {...register("username")}
                placeholder="Usuario"
            />
            <FormLabel htmlFor="password" fontWeight={700} pt={2}>Contraseña</FormLabel>
            <Input
                {...register("password")}
                placeholder="Contraseña"
                type="password"
            />
            <Flex alignItems="center" justifyContent="center" textAlign="center" fontWeight={600} p={4}>
                <Text color="redColor">{error}</Text>
            </Flex>
            <Flex d="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Button type="submit" bg={'defaultColor'} color={'whiteColor'} _hover={{ bg: "secondaryColor", color: "defaultColor" }}>
                    Iniciar Sesión
                </Button>

                <Link to="/registro" onClick={onClose} ml={2}>
                    <Flex alignItems="center" pt={3} pb={3}>
                        <Text>No tienes cuenta?</Text>
                        <Text fontWeight={800} _hover={{ textDecoration: "underline" }} p={2}>Regístrate</Text>
                    </Flex>
                </Link>
            </Flex>
        </form>
    );
};
LoginForm.propTypes = {
    onClose: PropTypes.func
  }

export default LoginForm;