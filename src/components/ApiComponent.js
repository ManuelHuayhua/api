import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', rol: '', nombre: '', correo: '', pass: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://52.20.145.207:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post('http://52.20.145.207:3000/api/user', newUser);
        getUsers();
        setNewUser({ id: '', rol: '', nombre: '', correo: '', pass: '' });
        setError('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    if (!newUser.id || !newUser.rol || !newUser.nombre || !newUser.correo || !newUser.pass) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    return true;
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://52.20.145.207:3000/api/user/${userId}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} - {user.correo}
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Usuario</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="ID"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rol"
          value={newUser.rol}
          onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.nombre}
          onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={newUser.correo}
          onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.pass}
          onChange={(e) => setNewUser({ ...newUser, pass: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ApiComponent;
