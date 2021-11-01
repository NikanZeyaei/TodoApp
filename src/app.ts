import Express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import csrf from 'csurf';
import todoRouter from './routes/todo';
import authRouter from './routes/auth';
import router_404 from './routes/404';
import { csrfMiddleware } from './middlewares/auth';

dotenv.config();

const app = Express();

const csrfProtection = csrf();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(
  session({
    secret: process.env.session_secret!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  }),
);
app.use(csrfProtection);
app.use(flash());

app.use(methodOverride('_method'));
app.use(Express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(csrfMiddleware);

app.use(todoRouter);
app.use(authRouter);
app.use(router_404);

app.listen(process.env.SERVER_PORT || '3000', () => {
  console.log('Started on http://localhost:3000');
});
