import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Center,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../App.css";

//ACA ME TRAIGO LOS CAMPOS QUE VIENEN DEL ITEM LIST PARA IR MOSTRANDO Y ARMANDO LA CARD

const Item = ({ id, nombre, imagen }) => {
  return (
    <div className="itemContainer">
      <Card className="cardContainer" maxW="sm">
        <CardBody className="cardProduct">
          <Image className="cardImage" src={imagen} alt="" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{nombre}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter alignItems="center" justifyContent="center">
          <Center>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="red">
                <Link to={`/product/${id}`}>Comprar</Link>
              </Button>
            </ButtonGroup>
          </Center>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Item;
