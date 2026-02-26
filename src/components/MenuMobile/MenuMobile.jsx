import React, { useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { Menu } from "@mui/icons-material";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

const MenuMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
    };

    const handleLinkClick = () => {
        handleClose();
    };
    return (
        <>
            <IconButton icon={<Menu />} aria-label="Open Menu" color="defaultColor" onClick={handleToggle} />
            <Drawer isOpen={isMenuOpen} placement="left" onClose={handleClose}>
                <DrawerOverlay />
                <DrawerContent bg={"defaultColor"} color={"whiteColor"} width={"50vh"}>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <NavBarMobile onLinkClick={handleLinkClick} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MenuMobile;
