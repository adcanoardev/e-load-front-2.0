import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/users/users.actions";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  Heading,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  AlternateEmail,
  Contacts,
  Loyalty,
  Person,
  PersonOutline,
  VerifiedUser,
} from "@mui/icons-material";

const AdminUsers = () => {
  const { loading, users } = useSelector((state) => state.users);
  useEffect(() => {
    getAllUsers();
  }, []);
  if (loading || !users) {
    return (
      <Flex justify="center" align="center" width='100%' height="100vh">
        <Spinner height='80px' width='80px' thickness="5px"  color="secondaryColor" emptyColor="defaultColor"/>
      </Flex>
    );
  }
  
  return (
    <Flex display="column">
      <Heading size="lg">Usuarios</Heading>
      <Spacer />
      <Divider my={5} />
      <Grid templateColumns="repeat(6, 1fr)" gap={6} gridAutoFlow="row dense">
        {users.map((user) => {
          return (
            <Card key={user._id}>
              <CardHeader>
                <Flex alignItems={"center"}>
                  <Person />
                  <Heading size="xs" textTransform="uppercase">
                    {user.username}
                  </Heading>
                </Flex>
                <Divider />
              </CardHeader>
              <CardBody>
                <Flex gap={1}>
                  <AlternateEmail />
                  <Text>{user.email}</Text>
                </Flex>
                <Flex alignItems={"center"} gap={1}>
                  <Contacts />
                  <Flex direction={"column"} justifyContent={"center"}>
                    <Text>{user.name}</Text>
                    <Divider />
                    <Text>{user.surnames}</Text>
                  </Flex>
                </Flex>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex width="100%" justifyContent={"space-between"}>
                  <Flex gap={1}>
                    <Loyalty />
                    {user.points}
                    <Text>Puntos</Text>
                  </Flex>

                  <Flex>
                    {user.rol === "user" ? (
                      <Flex>
                        <Text>Usuario</Text>
                        <PersonOutline />
                      </Flex>
                    ) : (
                      <Flex>
                        <Text>Admin</Text>
                        <VerifiedUser />
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default AdminUsers;
