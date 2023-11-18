import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import ItemCount from "./ItemCount";


//ACA BASICAMENTE AGARRA EL PRODUCTO YA CON EL ID DEL ITEMDETAILCONTAINER Y RENDERIZA EL MISMO EN UNA CARD QUE ARMO 
const ItemDetail = ({ producto }) => {
  return (
    <div>
      <Card  className="cardContainer" maxW="sm">
        <CardBody className="cardProduct">
          <Image
            className="cardImage"
            src={producto.imagen}
            alt=""
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{producto.nombre}</Heading>
            <Text>{producto.descripcion}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${producto.precio}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          {/* EL FOOTER DE ESTA CARD ES UN COMPONENTE ITEM COUNT QUE LE MANDO EL PRODUCTO POR PROPS */}
          <ItemCount producto={producto} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ItemDetail;
