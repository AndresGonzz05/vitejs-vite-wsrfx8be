import { useState, createContext, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.price * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
