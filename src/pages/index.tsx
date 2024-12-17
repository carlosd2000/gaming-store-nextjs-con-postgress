import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const images: string[] = [
    "/assets/img/carrucel1.jpg",
    "/assets/img/carrucel2.jpg",
    "/assets/img/carrucel3.jpg",
  ];

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
      {/* Inicio del Carrusel */}
      <div className="carousel">
        <Carousel showArrows autoPlay infiniteLoop showThumbs={false}>
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      {/* Fin del Carrusel */}
      <footer>
        <div className="footer-container">
          <div className="footer-column contact-info">
            <h3>CONTÁCTANOS</h3>
            <p>
              <i className="fas fa-map-marker-alt" /> Calle 15 # 77 - 30 Local B218
              (Centro comercial UNICO)
            </p>
            <p>
              <i className="fab fa-whatsapp" /> 301 485 2573
            </p>
          </div>
          <div className="footer-column horarios-info">
            <h3>HORARIOS</h3>
            <p>
              <i className="fas fa-clock" /> LUN - SAB: 9:00 AM - 7:00 PM
            </p>
            <p>
              <i className="fas fa-clock" /> DOM: 10:00 AM - 3:00 PM
            </p>
          </div>
          <div className="footer-column social-media">
            <h3>SÍGUENOS</h3>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook" />
              </a>
              <a href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
                <i className="fab fa-tiktok" />
              </a>
              <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="whatsapp-button">
          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            className="whatsapp-button"
          >
            ¿Cómo puedo ayudarte?
          </a>
        </div>
        <div className="footer-bottom">
          <p>Nexus Gaming Store © 2024. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
