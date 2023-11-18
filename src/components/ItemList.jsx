import React from "react";
import Item from "./Item";

//RECIBO POR PROPS TODOS LOS PRODUCTOS, LOS MAPEO Y LOS DESESTRUCTURO PARA LUEGO PASARLE LA INFO A ITEM
const ItemList = ({ productos }) => {
  return (
    <div>
      {productos.map((p) => {
        return (
          <Item
            key={p.id}
            id={p.id}
            nombre={p.nombre}
            descripcion={p.descripcion}
            categoria={p.categoria}
            precio={p.precio}
            stock={p.stock}
            imagen={p.imagen}
          />
        );
      })}
    </div>
  );
};

export default ItemList ;
