import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database/db';

// Obtener todos los usuarios
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Consultar todos los usuarios
    res.json(result.rows); // Enviar y mostrar los usuarios como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, contraseña } = req.body; // Obtener datos del cuerpo de la solicitud
  try {
    await pool.query('INSERT INTO users (name, email, contraseña) VALUES ($1, $2, $3)', [name, email, contraseña]); // Insertar un usuario
    res.json({ message: 'Usuario creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar el usuario
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, contraseña } = req.body;
  try {
    // Actualizar el usuario en la base de datos
    const result = await pool.query('UPDATE users SET name = $1, email = $2, contraseña = $3 WHERE id = $4 RETURNING *', [name, email, contraseña, id]);
    const updatedUser = result.rows[0]; // Obtiene el usuario con los datos que se actualizó
    // Devuelve el usuario actualizado en la respuesta
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Obtener el ID del usuario con sus datos
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]); // Eliminar un usuario por ID
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar un usuario' });
  }
};
