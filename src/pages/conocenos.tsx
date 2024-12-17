import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../public/assets/img/logo.png'; // Ruta relativa al archivo actual
import equipo from '../../public/assets/img/Equipo.jpg'; // Importar la imagen correctamente
import "../styles/conocenos.css"; // Importar los estilos específicos

const Conocenos: React.FC = () => {
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
    window.location.reload();
  };

  return (
    <div className="main-container">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Conócenos - Nexus Gaming Store</title>
      <link rel="icon" href={logo.src} />
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
      <section className="quienes-somos">
        <div className="contenedor2">
          <h1>Quiénes Somos</h1>
          <div className="content">
            <div className="text">
              <h2>Nosotros</h2>
              <p>
                En Nexus Gaming, somos un equipo en constante crecimiento y
                aprendizaje. Cada uno de nosotros comparte una pasión por la
                tecnología, lo que nos ha impulsado a crear esta plataforma.
                Queremos demostrar nuestras capacidades y, con dedicación y
                esfuerzo, hemos desarrollado esta tienda online que ofrece productos
                de alta calidad a todos los gamers y entusiastas de la tecnología.
              </p>
              <h2>Objetivos</h2>
              <p>
                Nuestro objetivo no solo es vender productos, sino ofrecer una
                experiencia de compra accesible y moderna.
              </p>
              <ul>
                <li>
                  Implementación de opciones para un inicio de sesión en múltiples
                  plataformas y un proceso de registro sencillo para hacer que el
                  acceso sea rápido y sin complicaciones.
                </li>
                <li>
                  Creación de un buscador avanzado, diseñado para facilitar la
                  búsqueda de tus productos favoritos de una forma más eficiente.
                </li>
                <li>
                  Contamos con un asistente virtual que te acompañará durante tu
                  visita, asegurándose de que tengas una experiencia fluida y
                  satisfactoria.
                </li>
                <li>
                  Nuestro carrito de compras es fácil de usar, permitiéndote
                  gestionar tus productos con agilidad, y ofrecemos múltiples
                  métodos de pago seguros para tu comodidad.
                </li>
                <li>
                  Ofrecemos la opción de redirigirte a WhatsApp, donde uno de
                  nuestros asesores estará disponible para brindarte asistencia
                  personalizada en tiempo real.
                </li>
              </ul>
              <p>
                Este proyecto refleja el compromiso de un equipo decidido a
                aprender, mejorar y darlo todo en este lindo proceso.
              </p>
            </div>
            <div className="image">
              <Image src={equipo} alt="Equipo Nexus" /> {/* Usar la imagen importada */}
            </div>
          </div>
        </div>
      </section>
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

export default Conocenos;
