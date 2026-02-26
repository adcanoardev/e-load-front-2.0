
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Flex,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AccessTime, Chat, FavoriteBorder, Power } from "@mui/icons-material";
import { getCommentsByStation } from "../../redux/comments/comments.actions";
import StationSpots from "../StationSpots/StationSpots";
import StationComments from "../StationComments/StationComments";
const Station = ({ isOpen, onClose }) => {
    const { stationSelected } = useSelector((state) => state.stations);    
    const [showSpots, setShowSpots] = useState(true);
    const [showComments, setShowComments] = useState(false);

    const handleSpotsClick = () => {
      setShowComments(false);
      setShowSpots(true);
    }
    const handleCommentsClick = async () => {
      await getCommentsByStation(stationSelected._id);
      setShowSpots(false);
      setShowComments(true);
    }
    const handleCloseDrawer = () => {
      onClose();
      handleSpotsClick();
    }
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleCloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={6}>
          {stationSelected.address}
          <Image src='https://res.cloudinary.com/dgkm71mjf/image/upload/v1686470412/e-load/e-load-station-02_xqi2zr.png'/>
        </DrawerHeader>
        <DrawerBody>
          <Flex justifyContent="space-between">
            <Flex gap={2}>
              <FavoriteBorder/>{stationSelected.likes}
              <AccessTime/>{stationSelected.schedule}
            </Flex>
            <Flex>
              <Tooltip label='Puestos'>
                <Power onClick={handleSpotsClick} cursor='pointer'/>            
              </Tooltip>
              <Tooltip label='Comentarios'>
                <Chat onClick={handleCommentsClick} cursor='pointer'/>
              </Tooltip>
            </Flex>
          </Flex>
          <Divider my={3}/>
          <Flex direction="column" gap={4}>
            {showSpots && <StationSpots/>}
            {showComments && <StationComments/>}
          </Flex>               
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
Station.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default Station;
