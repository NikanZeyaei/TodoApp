import { Request, Response } from 'express';
import { isLoggedInFuncion } from '../functions/isLoggedInFunction';
import bcrypt from 'bcrypt';
import { pool } from '../db/queries';

export const getIndex = (req: Request, res: Response) => {
  res.render('index', { isLoggedIn: isLoggedInFuncion(req) });
};

export const getPanel = (req: Request, res: Response) => {
  res.render('panel');
};
