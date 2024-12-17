import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import ProductoList from "../components/ProductoList";
import styles from "../styles/Home.module.css";

/**
 * Página Productos que muestra los productos de la aplicación.
 */
const Productos: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
      // Verificar si el usuario está autenticado
      const auth = localStorage.getItem('auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }, []);
  
    const handleLogout = () => {
      // Cerrar sesión
      localStorage.removeItem('auth');
      setIsAuthenticated(false);
      Swal.fire('Cierre de sesión', 'Has cerrado sesión correctamente', 'success');
      window.location.reload();
    };
  /**
   * Muestra una alerta de bienvenida usando SweetAlert2.
   */
  
  const showAlert = () => {
    Swal.fire({
      title: '¡Bienvenido al mundo del gaming!',
      text: 'Disfruta de los mejores productos gamers.',
      icon: 'success',
      confirmButtonText: '¡Vamos!',
    });
  };

  const [productos] = useState([
    { id: 1, title: "MSI MAG Infinite S3", valor: 1.149, image: "computador1.jpg" },
    { id: 2, title: "Drift DR275 PRO", valor: 229.00, image: "Drift DR275 PRO.png" },
    { id: 3, title: "Tatybo Cascos Gaming", valor: 15.99, image: "Tatybo Cascos Gaming.jpg" },
    { id: 4, title: "Logitech G203 LIGHTSYNC", valor: 29.99, image: "Logitech G203 LIGHTSYNC.png" },
    { id: 5, title: "PlayStation 5 Pro", valor: 799.99, image: "PS 5.jpg" },
    { id: 6, title: "Tarjeta de Regalo $100", valor: 100, image: "TR XBOX 100.jpg" },
    { id: 7, title: "The Legend of Zelda: Tears of the Kingdom", valor: 59.99, image: "the legends of zelda breath of the wild.jpg" },
    { id: 8, title: "Acer Nitro N50-650", valor: 849.00, image: "acernitron50650.jpg" },
    { id: 9, title: "NITROPC Pack Bronze", valor: 609.00, image: "NITROPC Pack Bronze.jpg" },
  ]);

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img
            src="/assets/img/logo.png"
            alt="Nexus Gaming Store Logo"
            className="logo"
            onClick={() => window.location.href = '/'}
          />
        </div>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              id="search-bar"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <button aria-label="Buscar">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
        <div className="right-icons">
          {isAuthenticated ? (
            <span className="login-button" aria-label="Cerrar sesión" onClick={handleLogout}>
              CERRAR SESIÓN
            </span>
          ) : (
            <Link href="/login">
              <span className="login-button" aria-label="Iniciar sesión">
                INICIAR SESIÓN
              </span>
            </Link>
          )}
          <div className="shopping-cart-icon" aria-label="Carrito de compras">
            <i className="fas fa-shopping-cart" />
          </div>
        </div>
      </nav>
      <div className="contenedor1">
        <div className="botones">
          <Link href="/productos">
            <span className="button" aria-label="Productos">
              PRODUCTOS
            </span>
          </Link>
          <Link href="/ayuda">
            <span className="button" aria-label="Ayuda">
              AYUDA
            </span>
          </Link>
          <Link href="/conocenos">
            <span className="button" aria-label="Conócenos">
              CONÓCENOS
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.centrado}>
        <h2 className={styles.tituloProductos}>TODOS LOS PRODUCTOS</h2>
        <p>En esta aplicación obtendrás los mejores productos gamers.</p>
        <button onClick={showAlert} className={styles.boton}>Click Me</button>
      </div>
      <ProductoList productos={productos} />
    </>
  );
};

export default Productos;
