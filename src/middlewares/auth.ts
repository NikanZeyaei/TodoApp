import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.email) {
    return next();
  } else {
    res.redirect('/login');
  }
};

export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.email) {
    return res.redirect('/panel');
  }
  next();
};

export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.isLoggedIn = req.session.email;
  res.locals.csrfToken = req.csrfToken();
  next();
};
