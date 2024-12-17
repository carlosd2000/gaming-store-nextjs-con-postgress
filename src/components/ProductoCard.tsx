import React from "react"; 
import Swal from "sweetalert2"; 
import { Producto } from "../types/Producto";
import styles from '../styles/Home.module.css';

interface ProductoCardProps {
  producto: Producto;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  const imageSrc = `/assets/img/${producto.image}`;

  const showDetails = () => {
    Swal.fire({
      title: producto.title,
      text: `agregaste al carrito por valor: ${producto.valor}`,
      imageUrl: imageSrc, 
      imageWidth: 200,
      imageAlt: `${producto.title} Poster`,
      confirmButtonText: "EXCELENTE!",
    });
  };

  return (
    <div className={styles.productoCard}>
      <img src={imageSrc} alt={producto.title} className={styles.productoImage} />
      <h3>{producto.title}</h3>
      <p>{producto.valor}</p>
      <button onClick={showDetails} className={styles.boton}>agregar al carrito</button>
    </div>
  );
};

export default ProductoCard;
