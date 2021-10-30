import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db/pool';
import { findUserByEmail, insertUser } from '../db/queries';
import { todo, user } from '../types/db/dbtypes';

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
  const poolResult = await pool.promise().query(findUserByEmail, [email]);
  const queryResult = poolResult[0] as user[];
  if (queryResult.length) {
    const passwordForEmail: string = queryResult[0].password;
    const userId: number = queryResult[0].id;
    if (await bcrypt.compare(password, passwordForEmail)) {
      req.session.userId = userId;
      req.session.email = email;
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
  const poolResult = await pool.promise().query(findUserByEmail, [email]);
  const queryResult = poolResult[0] as user[];
  if (queryResult.length) {
    req.flash('registerFailure', 'This email already exists');
    res.redirect('/register');
  } else {
    await pool.promise().query(insertUser, [email, hashedPassword]);
    req.flash('registerSuccess', 'You have been successfully registered!');
    res.redirect('/login');
  }
};

export const postLogout = async (req: Request, res: Response) => {
  req.session.email = null;
  res.redirect('/');
};
