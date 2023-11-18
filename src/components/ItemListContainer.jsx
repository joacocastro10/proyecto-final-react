import React from "react";
import ItemList from "./ItemList";
import { Center,CircularProgress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//IMPORT DE LA BASE DE DATOS
import { collection, getDocs, getFirestore } from "firebase/firestore";

const ItemListContainer = () => {
  //ACA USO EL USEPARAMS PARA Q ME TOME LA CATEGORIA,ASI COMO HICE CON EL ID,LO MISMO PERO POR CATEGORIA
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loader, setLoader] = useState(true);

  //ACA AGARRO LA BASE DE DATOS Y ME TRAIGO TOOOODOS LOS PRODUCTOS
  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "productos");

    setLoader(true)

    getDocs(itemsCollection)
      .then((snapshot) => {
        setProductos(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .finally(() => {
        //ESTE FINALLY ME OCULTA EL LOADER CUANDO TERMINA DE CARGAR TODOS LOS PRODUCTOS
        setLoader(false);
      });
  }, []);
  //FUNCION DE FILTRADO POR CATEGORIA
  const filteredProduct = productos.filter(
    (producto) => producto.categoria == categoria
  );
  
  //ACA EN EL RETURN HAGO IF TERNARIOS PARA QUE SI NO CARGAN LOS PRODUCTOS SE PONGA EL LOADER
  //Y SI YA CARGARON QUE SE FIJE SI HAY CATEGORIA Q ME MUESTRE TODOOS LOS ITEMS DE ESA CATEGORIA
  //Y SINO QUE ME MUESTRE TODOS LOS PRODUCTOS
  return (
    <>
      {loader ? (
        <Center>
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      ) : (
        <Center className="itemListContainer" p="1rem">
          {categoria ? (
            <ItemList productos={filteredProduct} />
          ) : (
            <ItemList productos={productos} />
          )}
        </Center>
      )}
    </>
  );
};

export default ItemListContainer;
