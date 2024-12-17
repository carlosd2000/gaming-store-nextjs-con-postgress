import React from "react";
import ProductoCard from "./ProductoCard";
import styles from '../styles/Home.module.css';

export interface Producto { id: number; title: string; valor: number; image: string;}
interface ProductoListProps {
  productos: Producto[];
}

const ProductoList: React.FC<ProductoListProps> = ({ productos }) => {
  return (
    <div className={styles.productoList}>
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ProductoList;
