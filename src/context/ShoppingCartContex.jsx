import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [badge, setBadge] = useState(0);

  const agregarProducto = (producto, count) => {
    if (count <= 0) {
      return;
    }
   
    const { id, nombre, precio } = producto;
    const productoExistente = carrito.find((p) => p.id === id);

    if (productoExistente) {
      productoExistente.count += count;
      setCarrito((carritoPrevio) =>
        carritoPrevio.map((p) => (p.id === id ? productoExistente : p))
      );
    } else {
      const nuevoProducto = { ...producto, count };
      setCarrito((carritoPrevio) => [...carritoPrevio, nuevoProducto]);

      // Incrementar el contador solo cuando se agrega un producto nuevo
      setBadge((prevBadge) => prevBadge + 1);
    }
  };

  const borrarProducto = (id) => {
    const productoAEliminar = carrito.find((p) => p.id === id);

    if (productoAEliminar) {
      const nuevoCarrito = carrito.filter((p) => p.id !== id);
      setCarrito(nuevoCarrito);

      // Decrementar el contador solo cuando se elimina un producto existente
      setBadge((prevBadge) => Math.max(0, prevBadge - 1));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setBadge(0); // Resetear el contador cuando se vacía el carrito
  };

  const cantidadProductosCarrito = () => {
    const itemsCarrito = carrito.length;
    setBadge(itemsCarrito);
  };

  const totalAPagar = () => {
    const total = carrito.reduce((acc, producto) => {
      return acc + producto.precio * producto.count;
    }, 0);
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        badge,
        setBadge,
        agregarProducto,
        borrarProducto,
        cantidadProductosCarrito,
        vaciarCarrito,
        totalAPagar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ShoppingCartProvider;
