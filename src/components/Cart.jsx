import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/ShoppingCartContex";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Center,
  Button,
  ButtonGroup,
  Box,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ModalFooter,
} from "@chakra-ui/react";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const Cart = () => {

  
  const { carrito, borrarProducto, totalAPagar, vaciarCarrito } =
    useContext(CartContext);

  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [showOrderInfo, setShowOrderInfo] = useState(false);


  const db = getFirestore();

  useEffect(() => {
    if (orderId) {
      setShowOrderInfo(true);
    }
  }, [orderId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      nombre,
      apellido,
      email,
      direccion,
    };

    try {
      const docRef = await addDoc(collection(db, "MiOrden"), order);
      setOrderId(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="tablaCarrito">

      
      {carrito.length === 0 ? (
        <Center>
          <p>Tu carrito de compras está vacío</p>
        </Center>
      ) : (
        <>
          <TableContainer>
            <Table size="md" className="table">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th fontSize={30} className="th">
                    PRODUCTOS
                  </Th>
                  <Th fontSize={30} className="th">
                    NOMBRE
                  </Th>
                  <Th fontSize={30}>PRECIO</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {carrito.map((producto) => (
                  <Tr key={producto.id}>
                    <Td fontSize={18}></Td>
                    <Td fontSize={18}>{producto.count}</Td>
                    <Td fontSize={18}>{producto.nombre}</Td>
                    <Td fontSize={18}>${producto.precio}</Td>
                    <Td fontSize={18}>
                      
                      <Button
                        onClick={() => borrarProducto(producto.id)}
                        colorScheme="red"
                      >
                        X
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td colSpan="5" textAlign="center" className="total">
                    
                    <h2>Precio Total = ${totalAPagar()}</h2>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box className="vaciarCarritoContainer">
            <Center className="buttonGroup">
              <ButtonGroup gap="2">
                <Button
                  onClick={vaciarCarrito}
                  colorScheme="red"
                  className="button"
                >
                  <Spacer />
                  Vaciar carrito
                </Button>

                <Button
                  onClick={() => setShowOrderInfo(true)}
                  colorScheme="blue"
                  className="button"
                >
                  Seguir Compra
                </Button>
              </ButtonGroup>
            </Center>
          </Box>
          <Modal
            isOpen={showOrderInfo}
            onClose={() => setShowOrderInfo(false)}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>¡Completa el Formulario!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      placeholder="Nombre"
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      type="text"
                      placeholder="Apellido"
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText>
                      Ingrese el email donde quiera recibir su orden de compra
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Direccion</FormLabel>
                    <Input
                      type="text"
                      placeholder="Direccion"
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Finalizar Orden
                  </Button>
                </form>
                {/* ACA RETORNA UN <P> CON EL NUMERO DE ORDERID QUE ME TRAIGO DE LA BASE DE DATOS */}
                <p>Número de orden: {orderId} </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => setShowOrderInfo(false)}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Cart;
