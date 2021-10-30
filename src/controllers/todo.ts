import { Request, Response } from 'express';
import { pool } from '../db/pool';
import { findAllTodosByUserId, insertTodo } from '../db/queries';
import { isLoggedInFuncion } from '../functions/isLoggedInFunction';
import { todo } from '../types/db/dbtypes';

export const getIndex = (req: Request, res: Response) => {
  res.render('index', { isLoggedIn: isLoggedInFuncion(req) });
};

export const getPanel = (req: Request, res: Response) => {
  res.render('panel');
};

export const getAllTodos = async (req: Request, res: Response) => {
  const poolResult = await pool
    .promise()
    .query(findAllTodosByUserId, [req.session.userId]);
  const todos = poolResult[0] as todo[];
  res.render('alltodos', { todos: todos });
};

export const getAddTodo = (req: Request, res: Response) => {
  res.render('addtodo');
};

export const postAddTodo = async (req: Request, res: Response) => {
  if (!isLoggedInFuncion(req)) {
    return res.send('You are not logged in');
  }
  const title = req.body.title as string;
  const todo = req.body.todo as string;
  const userId = req.session.userId as number;
  await pool.promise().query(insertTodo, [title, todo, userId]);
  res.redirect('/panel/todos');
};
