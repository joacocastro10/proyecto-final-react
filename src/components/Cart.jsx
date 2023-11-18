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

  //ACA USO USE CONTEXT PARA QUE ME "TRAIGA"  EL CARRITO CON EL CONTENIDO Y LAS FUNCIONES PARA TRABAJAR DENTRO DEL MISMO
  const { carrito, borrarProducto, totalAPagar, vaciarCarrito } =
    useContext(CartContext);

  //ESTAS CONST SON PARA CUANDO "SIGO LA COMPRA" EN EL MODAL QUE SALE ME VAYA AGARRANDO LOS CAMPOS Y ME LOS ALMACENE
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [showOrderInfo, setShowOrderInfo] = useState(false);

  //EMPIEZO A LLAMAR A LA BASE DE DATOS
  const db = getFirestore();

  useEffect(() => {
    if (orderId) {
      setShowOrderInfo(true);
    }
  }, [orderId]);


//HANDLE SUBMIT ES UNA FUNCION ASINCRONA Q TIENE EL PREVENT DEFAULT PARA Q NO SE DISPARE
  const handleSubmit = async (e) => {
    e.preventDefault();
//LUEGO ARMO UN OBJETO ORDER EL CUAL VA A IR ALMACENANDO DATOS
    const order = {
      nombre,
      apellido,
      email,
      direccion,
    };

    try {
      //ACA AGREGO EL ORDER A LA BASE DE DATOS A LA COLECCION "MI ORDEN"
      const docRef = await addDoc(collection(db, "MiOrden"), order);
      setOrderId(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="tablaCarrito">

      {/* ACA SI EL CARRITO ESTA VACIO NO APARECE LA TABLA Y APARECE EL MENSAJE CARRITO VACIO QUE LO HAGO CON UN IF TERNARIO */}
      {carrito.length === 0 ? (
        <Center>
          <p>Tu carrito de compras está vacío</p>
        </Center>
      ) : (
        <>
        {/* ACA APARECE LA TABLA LA CUAL SE VA A IR LLENANDO CON LOS DATOS QUE LE PASO POR USE CONTEXT */}
          <TableContainer>
            <Table size="md" className="table">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th fontSize={30} className="th">
                    CANTIDAD
                  </Th>
                  <Th fontSize={30} className="th">
                    NOMBRE
                  </Th>
                  <Th fontSize={30}>PRECIO</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* ACA MAS ESPECIFICAMENTE HACE UN MAPEO POR LOS PRODUCTOS Y LOS VA "PINTANDO EN LA TABLA" */}
                {carrito.map((producto) => (
                  <Tr key={producto.id}>
                    <Td fontSize={18}></Td>
                    <Td fontSize={18}>{producto.count}</Td>
                    <Td fontSize={18}>{producto.nombre}</Td>
                    <Td fontSize={18}>${producto.precio}</Td>
                    <Td fontSize={18}>
                      {/* BOTON QUE ME BORRA EL PRODUCTO POR EL ID CORRESPONDIENTE ES DECIR BORRA TODO EL ARTICULO SELECCIONADO*/}
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
                    {/* ACA CON USE CONTEXT TRAIGO LA FUNCION TOTAL A PAGAR QUE ME TRAE EL RESULTADO DE LA COMPRA TOTAL */}
                    <h2>Total = ${totalAPagar()}</h2>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box className="vaciarCarritoContainer">
            <Center className="buttonGroup">
              <ButtonGroup gap="2">
                {/* BUTTOON PARA VACIAR CARRITO,ESTE LO VACIA COMPLETO */}
                <Button
                  onClick={vaciarCarrito}
                  colorScheme="red"
                  className="button"
                >
                  <Spacer />
                  Vaciar carrito
                </Button>
                {/* BOTON QUE ME "DEJA" SEGUIR LA COMPRA Y ABRE EL MODAL CON EL FORMULARIO DE ENVIO */}
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
          {/* MODAL QUE SE ABRE Y TIENE UN FORM QUE ENVIA LA DATA A LA BASE DE DATOS CON LOS E.TARGET.VALUE */}
          <Modal
            isOpen={showOrderInfo}
            onClose={() => setShowOrderInfo(false)}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>¡Formulario de Envio!</ModalHeader>
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
                    Finalizar Compra
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
