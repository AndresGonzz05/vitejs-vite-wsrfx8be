import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaProductos from './paginas/ListaProductos';
import DetallesProducto from './paginas/DetallesProducto';
import Carrito from './paginas/Carrito';
import { CarritoProvider, useCarrito } from './hooks/useCarrito'; // Importa useCarrito
import './estilos/global.scss';
import { FaShoppingCart } from 'react-icons/fa';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <div>
          <Navegacion /> {/* Componente de navegación separado */}
          <Routes>
            <Route path="/" element={<ListaProductos />} />
            <Route path="/producto/:id" element={<DetallesProducto />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </div>
      </Router>
    </CarritoProvider>
  );
}

// Componente separado para la navegación
function Navegacion() {
  const { carrito } = useCarrito();
  const itemCount = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Productos</Link>
        </li>
        <li className="carrito-link">
          <Link to="/carrito">
            <FaShoppingCart />
            {itemCount > 0 && (
              <span className="contador-carrito">{itemCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
