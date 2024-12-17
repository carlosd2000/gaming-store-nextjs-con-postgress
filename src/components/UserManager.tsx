import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  contraseña: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await fetch('/api/users');
    const users = await response.json();
    setUsers(users);
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const contraseña = (form.elements.namedItem('contraseña') as HTMLInputElement).value;

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, contraseña }),
    });

    if (response.ok) {
      Swal.fire('Éxito', 'Usuario creado', 'success');
      form.reset();
      loadUsers();
    } else {
      Swal.fire('Error', 'Hubo un problema al crear el usuario', 'error');
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const contraseña = (form.elements.namedItem('contraseña') as HTMLInputElement).value;

    if (!name || !email || !contraseña) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }

    const response = await fetch(`/api/users?id=${editingUser!.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, contraseña }),
    });

    if (response.ok) {
      Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
      setEditingUser(null);
      loadUsers();
    } else {
      Swal.fire('Error', 'Hubo un problema al actualizar el usuario', 'error');
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmation = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      loadUsers();
    }
  };

  return (
    <div>
      <form id="userForm" className="crud-form" onSubmit={handleCreateUser}>
        <input type="text" id="name" name="name" placeholder="Digite el nombre:" required />
        <input type="email" id="email" name="email" placeholder="Digite su correo:" required />
        <input type="password" id="contraseña" name="contraseña" placeholder="Digite su contraseña" required />
        <button type="submit" className="crud-btn">Crear Usuario</button>
      </form>
      <ul id="userList" className="crud-user-list">
        {users.map((user) => (
          <li key={user.id} className="crud-user-list-item">
            <span>{user.name} ({user.email}) - {user.contraseña}</span>
            <div>
              <button className="crud-btn edit-btn" onClick={() => openEditModal(user)}>Editar</button>
              <button className="crud-btn delete-btn" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {editingUser && (
        <div id="editModal" className="crud-modal" style={{ display: 'flex' }}>
          <div className="crud-modal-content">
            <h2>Editar Usuario</h2>
            <form id="editForm" className="crud-form" onSubmit={handleUpdateUser}>
              <div className="crud-form-group">
                <label htmlFor="editName">Nombre:</label>
                <input type="text" id="editName" name="name" defaultValue={editingUser.name} required />
              </div>
              <div className="crud-form-group">
                <label htmlFor="editEmail">Correo:</label>
                <input type="email" id="editEmail" name="email" defaultValue={editingUser.email} required />
              </div>
              <div className="crud-form-group">
                <label htmlFor="editContraseña">Contraseña:</label>
                <input type="password" id="editContraseña" name="contraseña" defaultValue={editingUser.contraseña} required />
              </div>
              <div className="crud-modal-buttons">
                <button type="submit" className="crud-save-btn">Actualizar Datos</button>
                <button type="button" className="crud-cancel-btn" onClick={() => setEditingUser(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
