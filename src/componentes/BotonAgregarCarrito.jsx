import '../estilos/BotonAgregarCarrito.scss';

function BotonAgregarCarrito({ producto, agregarAlCarrito }) {
  const handleClick = () => {
    agregarAlCarrito(producto);
  };

  return (
    <button className="boton-agregar-carrito" onClick={handleClick}>
      Agregar al carrito
    </button>
  );
}

export default BotonAgregarCarrito;