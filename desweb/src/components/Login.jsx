import { useState } from "react";
import { login } from "../api/auth";
import "../styles/login.css";

export default function Login({ onLoginSuccess, onGoToRegister }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>🔐 Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            type="button"
            onClick={onGoToRegister}
            style={{
              background: "transparent",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              fontSize: "0.95rem",
              textDecoration: "underline"
            }}
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}