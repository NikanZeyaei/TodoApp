import express, { NextFunction, Request, Response } from 'express';

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
