import { Divider, Flex, Heading, Progress } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const LoyaltyPoints = () => {

  const {user} = useSelector((state)=> state.users) 
  
   const progressBarStyles = {
    width: '1000px',
    background: 'grayColor'
    };


  return (
    <Flex display='column'>
      <Heading size='lg'>Puntos de Fidelizacicón</Heading>
      <Divider my={5} />
    {/* <Flex> */}
    <Progress value={user.points} size='xs' color='secondaryColor' sx={progressBarStyles}/>
    {/* <Progress
          colorScheme='green'
          height='32px'
          value={500}
          // value={user.points}
          min={0}
          max={500}
        /> */}
    {/* </Flex> */}
    </Flex>
  )
}

export default LoyaltyPoints
