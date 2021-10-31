import { createConnection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = createConnection({
  host: process.env.db_host,
  port: 3306,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});
