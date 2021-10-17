import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db/queries';

export const getIndex = (req: Request, res: Response) => {
  res.render('index');
};

export const getPanel = (req: Request, res: Response) => {
  res.render('panel');
};
