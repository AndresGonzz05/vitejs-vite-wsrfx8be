import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../estilos/DetallesProducto.scss';
import { useCarrito } from '../hooks/useCarrito';
import ProductoCard from '../componentes/ProductoCard';

function DetallesProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [otrosProductos, setOtrosProductos] = useState([]);
  const [otrosProductosError, setOtrosProductosError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProducto(response.data))
      .catch((error) => {
        console.error('Error al cargar los detalles del producto:', error);
        setError(
          'Hubo un error al cargar los detalles del producto. Por favor, intenta nuevamente más tarde.'
        );
      });

    axios
      .get('https://fakestoreapi.com/products')
      .then((response) =>
        setOtrosProductos(response.data.filter((p) => p.id !== parseInt(id)))
      )
      .catch((error) => {
        console.error('Error al cargar otros productos:', error);
        setOtrosProductosError('Hubo un error al cargar otros productos.');
      });
  }, [id]);

  const handleCantidadChange = (event) => {
    setCantidad(parseInt(event.target.value, 10));
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ ...producto, cantidad });
  };

  if (error) {
    return <div className="error-mensaje">{error}</div>;
  }

  if (!producto) {
    return <div>Cargando detalles...</div>;
  }

  return (
    <div className="detalles-producto-container">
      <div className="detalles-producto">
        <img src={producto.image} alt={producto.title} />
        <div className="info">
          <h2>{producto.title}</h2>
          <p className="precio">${producto.price}</p>
          <p className="categoria">Categoría: {producto.category}</p>
          <p className="descripcion">{producto.description}</p>
          <div className="selector-cantidad">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              min="1"
              onChange={handleCantidadChange}
            />
          </div>
          <button
            className="boton-agregar-carrito"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {otrosProductos.length > 0 && (
        <div className="otros-productos-container">
          <h3>Otros Productos</h3>
          <div className="otros-productos-lista">
            {otrosProductos.map((otroProducto) => (
              <ProductoCard key={otroProducto.id} producto={otroProducto} />
            ))}
          </div>
        </div>
      )}

      {otrosProductosError && (
        <div className="error-mensaje">{otrosProductosError}</div>
      )}
    </div>
  );
}

export default DetallesProducto;
