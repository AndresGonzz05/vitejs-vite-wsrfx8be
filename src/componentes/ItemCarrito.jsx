import '../estilos/ItemCarrito.scss';

function ItemCarrito({ item, eliminarDelCarrito }) {
  return (
    <div className="item-carrito">
      <img src={item.image} alt={item.title} />
      <div className="detalles">
        <h3>{item.title}</h3>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: {item.cantidad}</p>
      </div>
      <button className="boton-eliminar" onClick={() => eliminarDelCarrito(item.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default ItemCarrito;