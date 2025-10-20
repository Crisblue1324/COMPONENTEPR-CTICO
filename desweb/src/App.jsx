import { useState, useEffect } from 'react';
import './App.css';
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { verifyToken } from "./api/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await verifyToken(token);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("token", error);
          localStorage.removeItem("username");
          setIsAuthenticated(false);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  // Mostrar pantalla de carga mientras verifica el token
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#667eea'
      }}>
        <h2>⏳ Cargando...</h2>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Home onLogout={handleLogout} />
      ) : showRegister ? (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onBackToLogin={toggleRegister}
        />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onGoToRegister={toggleRegister}
        />
      )}
    </>
  );
}

export default App;