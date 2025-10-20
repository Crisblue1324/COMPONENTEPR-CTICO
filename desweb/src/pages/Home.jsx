import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function Home({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      if (error.response?.status === 401) {
        alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
        onLogout();
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await updateUser(editingUser._id, data);
        setEditingUser(null);
      } else {
        await createUser(data);
      }
      setShowForm(false);
      loadUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      if (error.response?.status === 401) {
        onLogout();
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        if (error.response?.status === 401) {
          onLogout();
        }
      }
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const username = localStorage.getItem("username") || "Usuario";

  return (
    <div style={{ padding: "20px" }}>
      {/* Header con botón de cerrar sesión */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <h1 style={{ margin: 0 }}>Formulario CRUD - React</h1>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <span style={{
            fontWeight: "500",
            color: "#555"
          }}>
            👤 {username}
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#c82333"}
            onMouseOut={(e) => e.target.style.background = "#dc3545"}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Botón agregar */}
      <button
        className="add-btn"
        onClick={() => setShowForm(true)}
      >
        Agregar Usuario
      </button>

      {/* Modal del formulario */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserForm onSubmit={handleSubmit} editingUser={editingUser} />
            <button className="close-btn" onClick={closeForm}>X</button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}