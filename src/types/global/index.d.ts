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

export interface todo {
  title: string;
  todo_text: string;
}

// I have done this wrong. I'll fix it later.

// import { QueryResult } from 'pg';

// interface QueryResult {
//   email: string;
//   password: string;
//   userId: number;
//   title: string;
//   todo: string;
// }
