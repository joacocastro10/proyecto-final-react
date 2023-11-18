import React from "react";
import CartWidget from "./CartWidget";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Spacer,
  Image
} from "@chakra-ui/react";
import "../App.css";
import { Link } from "react-router-dom";
import logo from "../../public/images/bocalogopng.png"

const Navbar = () => {
  return (
    <div>
      <Flex align="center" justify="center" maxW="100%" bg="blue">
        <Box  maxW="15%" p="4">
          <Link to={"/"}>
            <Image className="Logo" src={logo} alt="" />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton
              color="white"
              className="btnCategorias"
            >
              Categorias
            </MenuButton>
            <MenuList className="dropdownCategorias">

              <Link to={`/categoria/${"camisetas"}`}>
                <MenuItem>camisetas</MenuItem>
              </Link>
              <Link to={`/categoria/${"shorts"}`}>
                <MenuItem>shorts</MenuItem>
              </Link>
              <Link to={`categoria/${"buzos"}`}>
                <MenuItem>buzos</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        <Box p="7" >
          <CartWidget />
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
