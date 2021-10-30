import Express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import todoRouter from './routes/todo';
import authRouter from './routes/auth';
import router_404 from './routes/404';

dotenv.config();

const app = Express();

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
app.use(flash());

app.use(Express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(todoRouter);
app.use(authRouter);
app.use(router_404);

app.listen(process.env.SERVER_PORT || '3000', () => {
  console.log('Started on http://localhost:3000');
});
