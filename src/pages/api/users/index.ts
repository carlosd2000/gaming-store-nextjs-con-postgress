import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database/db';

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, contraseña } = req.body;
  try {
    await pool.query('INSERT INTO users (name, email, contraseña) VALUES ($1, $2, $3)', [name, email, contraseña]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({ error: 'Error creando usuario' });
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, contraseña } = req.body;
  try {
    await pool.query('UPDATE users SET name = $1, email = $2, contraseña = $3 WHERE id = $4', [name, email, contraseña, id]);
    res.status(200).json({ message: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
};

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const user = result.rows[0];
    if (user.contraseña !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.status(200).json({ message: 'Usuario autenticado', user });
  } catch (error) {
    console.error('Error verificando usuario:', error);
    res.status(500).json({ error: 'Error verificando usuario' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getUsers(req, res);
      break;
    case 'POST':
      await createUser(req, res);
      break;
    case 'PUT':
      await updateUser(req, res);
      break;
    case 'DELETE':
      await deleteUser(req, res);
      break;
    case 'PATCH': // Utiliza PATCH para verificar el usuario
      await verifyUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
