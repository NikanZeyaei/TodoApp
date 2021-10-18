import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port: 5432,
});

export const findUserByEmail = 'select * from USERS where email = $1;';

export const insertUser = 'insert into users(email, password) values ($1,$2)';
