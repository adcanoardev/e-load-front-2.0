import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllComments } from "../../../redux/comments/comments.actions";
import { Divider, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react";

const AdminComments = () => {
    const { loading, comments } = useSelector((state) => state.comments);
    useEffect(() => {
        getAllComments();
    }, []);
    if (loading || !comments) {
        return (
            <Flex justify="center" align="center" width="100%" height="100vh">
                <Spinner height="80px" width="80px" thickness="5px" color="secondaryColor" emptyColor="defaultColor" />
            </Flex>
        );
    }
    return (
        <Flex display="column">
            <Heading size="lg">Comentarios</Heading>
            <Spacer />
            <Divider my={5} />

            {comments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <p>{comment.user}</p>
                        <p>{comment.body}</p>
                        <p>{comment.createdAt}</p>
                    </div>
                );
            })}
        </Flex>
    );
};

export default AdminComments;
