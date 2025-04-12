import React from 'react';
import { useCarrito } from '../hooks/useCarrito';
import ItemCarrito from '../componentes/ItemCarrito';
import '../estilos/Carrito.scss';

function Carrito() {
  const { carrito, eliminarDelCarrito, total } = useCarrito();

  if (carrito.length === 0) {
    return <div className="carrito-vacio">El carrito está vacío.</div>;
  }

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      <div className="lista-items">
        {carrito.map(item => (
          <ItemCarrito key={item.id} item={item} eliminarDelCarrito={eliminarDelCarrito} />
        ))}
      </div>
      <div className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default Carrito;