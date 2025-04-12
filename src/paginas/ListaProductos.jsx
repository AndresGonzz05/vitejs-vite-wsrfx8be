import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoCard from '../componentes/ProductoCard';
import '../estilos/ListaProductos.scss';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => setProductos(response.data))
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
        setError(
          'Hubo un error al cargar la lista de productos. Por favor, intenta nuevamente más tarde.'
        );
      });
  }, []);

  if (error) {
    return <div className="error-mensaje">{error}</div>;
  }

  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ListaProductos;
