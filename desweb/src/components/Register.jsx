import { useState } from "react";
import { register } from "../api/auth";
import "../styles/login.css";

export default function Register({ onRegisterSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword: _confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      onRegisterSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>📝 Registro</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={3}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={6}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            type="button"
            onClick={onBackToLogin}
            style={{
              background: "transparent",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              fontSize: "0.95rem",
              textDecoration: "underline"
            }}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
}