import React from 'react';
import UserManager from '../components/UserManager';
import "../styles/crud.css"; // Importa el archivo CSS desde src/styles/crud.css

const CrudPage: React.FC = () => {
  return (
    <div className="crud-body">
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
      <div className="crud-container">
        <h1 className="crud-title">CRUD de Usuarios</h1>
        <UserManager />
      </div>
    </div>
  );
};

export default CrudPage;
