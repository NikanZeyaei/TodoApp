import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import todoRouter from './routes/todo';
import authRouter from './routes/auth';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use(todoRouter);
app.use(authRouter);

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.listen('3000', () => {
  console.log('Started on http://localhost:3000');
});
