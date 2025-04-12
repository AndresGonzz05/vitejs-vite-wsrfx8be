import { Link } from 'react-router-dom';
import '../estilos/ProductoCard.scss';

function ProductoCard({ producto }) {
  return (
    <div className="producto-card">
      <Link to={`/producto/${producto.id}`}>
        <img src={producto.image} alt={producto.title} />
        <h3>{producto.title}</h3>
        <p>${producto.price}</p>
      </Link>
    </div>
  );
}

export default ProductoCard;