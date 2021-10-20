import { Request, Response } from 'express';

export const get404 = (req: Request, res: Response) => {
  res.render('404');
};

export const other404 = (req: Request, res: Response) => {};
