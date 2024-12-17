// importar libreria para la conexxion de postgres

import { Pool } from "pg";

// crear la conexion a la base de datos postgresSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_users',
    password: '123456789',
    port: 5432
});

export default pool;
