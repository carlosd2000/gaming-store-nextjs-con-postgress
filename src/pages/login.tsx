import React from 'react';
import Swal from 'sweetalert2';
import "../styles/login.css";

const Login: React.FC = () => {

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const response = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      Swal.fire('Éxito', 'Usuario autenticado', 'success');
      // Almacenar el estado de autenticación
      localStorage.setItem('auth', 'true');
      // Redirigir al usuario a la página principal después del inicio de sesión exitoso
      window.location.href = '/';
    } else {
      const error = await response.json();
      if (error.error === 'Usuario no encontrado') {
        Swal.fire('Error', 'Usuario no encontrado', 'error');
      } else if (error.error === 'Contraseña incorrecta') {
        Swal.fire('Advertencia', 'Contraseña incorrecta', 'warning');
      } else {
        Swal.fire('Error', 'Error al iniciar sesión', 'error');
      }
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Iniciar Sesión - Nexus Gaming Store</title>
      <link rel="icon" href="/assets/img/logo.png" />
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
            <input type="text" placeholder="Buscar..." aria-label="Buscar" />
            <button aria-label="Buscar">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
        <div className="right-icons">
          <button
            className="login-button"
            onClick={() => window.location.href = '/crud'}
            aria-label="Registrarse"
          >
            REGISTRARSE
          </button>
          <div className="shopping-cart-icon" aria-label="Carrito de compras">
            <i className="fas fa-shopping-cart" />
          </div>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-form-container">
          <h2>Iniciar Sesión</h2>
          <form id="loginForm" className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" required autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="loginbtn">
              Iniciar sesión
            </button>
          </form>
          <div className="signup">
            <p>
              ¿No tienes una cuenta? <a href="/crud">Regístrate</a>.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook" />
              </a>
              <a href="https://mail.google.com" target="_blank" aria-label="Gmail">
                <i className="fab fa-google" />
              </a>
              <a href="https://www.twitter.com" target="_blank" aria-label="Twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.github.com" target="_blank" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
          <div className="back-to-home">
            <button
              className="homebtn"
              onClick={() => window.location.href = '/'}
            >
              Volver a Inicio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
