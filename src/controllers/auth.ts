import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db/queries';

export const getLogin = async (req: Request, res: Response) => {
  res.render('login', {
    error: req.flash('loginFailure'),
    registerSuccess: req.flash('registerSuccess'),
  });
};

export const getRegister = (req: Request, res: Response) => {
  res.render('register', {
    registerFailure: req.flash('registerFailure'),
  });
};

export const postLogin = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const password = req.body.password as string;
  const queryResult = pool.query('select * from USERS where email = $1;', [
    email,
  ]);
  if ((await queryResult).rows.length) {
    const passwordForEmail = (await queryResult).rows[0].password;
    if (await bcrypt.compare(password, passwordForEmail)) {
      console.log('here1');
      req.session.email = email;
      // req.flash('loginSuccess', 'You have successfully logged in');
      res.redirect('/panel');
    } else {
      req.flash('loginFailure', 'Incorrect Username or Password');
      res.redirect('/login');
    }
  } else {
    req.flash('loginFailure', 'Incorrect Username or Password');
    res.redirect('/login');
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const password = req.body.password as string;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const checkForExisting = await pool.query(
    'SELECT * from USERS where email = $1',
    [email],
  );
  if (checkForExisting.rowCount) {
    req.flash('registerFailure', 'This email already exists');
    res.redirect('/register');
  } else {
    await pool.query('insert into users(email, password) values ($1,$2)', [
      email,
      hashedPassword,
    ]);
    req.flash('registerSuccess', 'You have been successfully registered!');
    res.redirect('/login');
  }
};

export const postLogout = async (req: Request, res: Response) => {
  req.session.email = null;
  res.redirect('/');
};
