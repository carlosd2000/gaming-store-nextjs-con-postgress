import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';
import logo from '../../public/assets/img/logo.png'; // Ruta relativa al archivo actual
import "../styles/ayuda.css"; // Importa los estilos específicos de ayuda

const Ayuda: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    Swal.fire('Cierre de sesión', 'Has cerrado sesión correctamente', 'success');
    window.location.reload();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className="main-container">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Ayuda - Nexus Gaming Store</title>
      <link rel="icon" href="/assets/img/logo.png" />
      <nav className="navbar">
        <div className="logo-container">
          <Image
            src={logo}
            alt="Nexus Gaming Store Logo"
            className="logo"
            onClick={() => handleNavigation('/')}
          />
        </div>
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." aria-label="Buscar" />
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
            <button
              className="login-button"
              onClick={() => handleNavigation('/login')}
              aria-label="Iniciar sesión"
            >
              INICIAR SESIÓN
            </button>
          )}
          <div className="shopping-cart-icon" aria-label="Carrito de compras">
            <i className="fas fa-shopping-cart" />
          </div>
        </div>
      </nav>
      <div className="content-container"> {/* Contenedor principal */}
        <h1>Centro de Ayuda</h1>
        <div className="help-content"> {/* Fusiona todas las secciones en un solo contenedor */}
          <div className="faq-section">
            <h2>Preguntas Frecuentes</h2>
            <div className="faq">
              <h3>¿Cómo realizo un pedido?</h3>
              <p>Puedes realizar un pedido seleccionando los productos que desees y añadiéndolos a tu carrito de compras. Luego, sigue los pasos de pago.</p>
              <h3>¿Cuáles son los métodos de pago aceptados?</h3>
              <p>Aceptamos tarjetas de crédito, débito, y pagos a través de PayPal.</p>
              <h3>¿Cuánto tiempo tarda la entrega?</h3>
              <p>El tiempo de entrega varía según tu ubicación, pero usualmente entre 3 y 7 días hábiles.</p>
            </div>
          </div>
          <div className="contact-section">
            <h2>Contáctanos</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" required />
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={4} required />
              <button type="submit">Enviar Mensaje</button>
            </form>
          </div>
          <div className="return-home">
            <button className="button" onClick={() => handleNavigation('/')}>
              Volver a la página principal
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Ayuda;
