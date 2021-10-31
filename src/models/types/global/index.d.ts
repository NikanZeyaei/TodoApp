import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      _test: string;
    }
  }
}

import session from 'express-session';

declare module 'express-session' {
  interface Session {
    email?: string | null;
    userId?: number | null;
  }
}
