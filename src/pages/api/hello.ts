import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../database/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getUsers(req, res);
      break;
    case 'POST':
      await createUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

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
