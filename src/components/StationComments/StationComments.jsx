import { Avatar, Card, Flex } from '@chakra-ui/react';
import moment from 'moment/moment';
import "moment/locale/es";
import { useSelector } from 'react-redux';

const StationComments = () => {
    const { commentsByStation } = useSelector((state) => state.comments);
  return (
    commentsByStation.map((comment) => {
        const date = new Date(comment.createdAt);
        const commentedAgo = moment(date).fromNow();
        return (
          <Card key={comment._id} padding={2}>
            <Flex direction="column">
              <Flex display='flex' justifyContent='space-between'>
                <Avatar src={comment.user.image}/>
                <p>{commentedAgo}</p>
              </Flex>
              <p>{comment.body}</p>
            </Flex>            
          </Card>
        )
      })
  )
}

export default StationComments