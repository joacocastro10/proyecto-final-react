import React from "react";
import ItemDetail from "./ItemDetail";
import { Center, CircularProgress} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const ItemDetailContainer = () => {
    //ACA USO USE PARAMS PARA QUE ME AGARRE EL ID DEL PRODUCTO ASI LO PUEDA MANIPULAR MAS ADELANTE
    const { id } = useParams()
    const [producto, setProducto] = useState();
    //LOADER POR SI TRDAN EN CARGAR LOS PRODUCTOS
    const [loader, setLoader] = useState(true)

    //ACA HAGO EL USE EFFECT PARA QUE ME SETE EL PRODUCTO SEGUN EL ID
    useEffect(() => {
        const db = getFirestore();
        //ACA ES LA PARTE DEL ID Q LO ALMACENO EN "ONEITEM"
        const oneItem = doc(db, "productos", `${id}`);
        getDoc(oneItem).then((snapshot) => {
            if (snapshot.exists()) {
                setProducto({ id: snapshot.id, ...snapshot.data() });
                setLoader(false)

            }
        });
    }, []);

    //ACA HAGO EL RETORNO QUE PRIMERO CARGUE Y DESPUES LE PASE POR PROPS EL PRODUCTO CON EL ID CORRESPONDIENTE A ITEMDETAIL
    return (
        <>
            <Center p="1rem">
           
                {loader ? <CircularProgress isIndeterminate color='green.300' /> : <ItemDetail producto={producto} />}
            </Center>
        </>
    );
};

export default ItemDetailContainer;