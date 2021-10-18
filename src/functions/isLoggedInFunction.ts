import { Request } from 'express';

export const isLoggedInFuncion = (req: Request) => {
  return req.session.email ? true : false;
};
