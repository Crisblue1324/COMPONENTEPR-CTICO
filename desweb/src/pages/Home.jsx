import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (data) => {
    if (editingUser) {
      await updateUser(editingUser._id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }
    setShowForm(false); 
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Formulario CRUD - React
      </h1>

      {}
      <button
        className="add-btn"
        onClick={() => setShowForm(true)}
      >
        Agregar Usuario
      </button>

      {}
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
