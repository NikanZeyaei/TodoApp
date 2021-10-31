import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../models/pool';
import {
  findUserByEmail,
  findUserByToken,
  insertResetToken,
  insertUser,
  updatePasswordByEmail,
} from '../models/queries';
import crypto from 'crypto';
import { todo, user } from '../models/types/db/dbtypes';
import {
  sendResetPasswordEmail,
  sendRegistrationEmail,
} from '../email/sendEmails';

export const getLogin = (req: Request, res: Response) => {
  res.render('login', {
    error: req.flash('loginFailure'),
    registerSuccess: req.flash('registerSuccess'),
    passwordResetSuccessful: req.flash('resetPasswordSuccessful'),
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
    return await sendRegistrationEmail(email);
  }
};

export const postLogout = (req: Request, res: Response) => {
  req.session.email = null;
  res.redirect('/');
};

export const getResetPassword = (req: Request, res: Response) => {
  res.render('resetPassword', {
    error: req.flash('resetPasswordError'),
    success: req.flash('resetPasswordSuccess'),
    expiredToken: req.flash('resetPasswordTokenExpired'),
    invalidToken: req.flash('invalidToken'),
  });
};

export const postResetPassword = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const randomBuffer = crypto.randomBytes(32);
  const token = randomBuffer.toString('hex');
  const token_expiration = Date.now() + 3600 * 1000;
  const poolResult = await pool.promise().query(findUserByEmail, [email]);
  const queryResult = poolResult[0] as user[];
  if (queryResult.length) {
    req.flash('resetPasswordSuccess', `An email was sent to ${email}`);
    res.redirect('reset');
    await pool
      .promise()
      .query(insertResetToken, [token, token_expiration, email]);
    return await sendResetPasswordEmail(email, token);
  } else {
    req.flash('resetPasswordError', 'No account was found');
    return res.redirect('/reset');
  }
};

export const getTokenVerification = async (req: Request, res: Response) => {
  const token = req.params.token as string;
  const poolResult = await pool.promise().query(findUserByToken, [token]);
  const queryResult = poolResult[0] as user[];
  if (queryResult.length) {
    const user = queryResult[0];
    if (
      user.reset_token === token &&
      user.reset_token_expiration > Date.now()
    ) {
      return res.render('newPassword', {
        email: user.email,
        token: token,
      });
    } else if (user.reset_token_expiration < Date.now()) {
      req.flash(
        'resetPasswordTokenExpired',
        'Your current token is expired.Please request another password reset.',
      );
      return res.redirect('/reset');
    } else {
      req.flash('invalidToken', 'Invalid token');
      return res.redirect('/reset');
    }
  } else {
    req.flash('invalidToken', 'Invalid token');
    return res.redirect('/reset');
  }
};

export const postNewPassword = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const token = req.body.token as string;
  const password = req.body.password as string;
  const poolResult = await pool.promise().query(findUserByToken, [token]);
  const queryResult = poolResult[0] as user[];
  if (queryResult.length) {
    const user = queryResult[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (
      user.reset_token === token &&
      user.reset_token_expiration > Date.now() &&
      user.email === email
    ) {
      await pool
        .promise()
        .query(updatePasswordByEmail, [hashedPassword, email]);
      req.flash('resetPasswordSuccessful', 'Password reset was successful');
      return res.redirect('/login');
    } else {
      res.send('Unhandled Exception'); // TODO Fix this
    }
  }
  res.send('Unhandled Exception'); // TODO Fix this
};
