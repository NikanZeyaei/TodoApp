import { Request, Response } from 'express';
import { findAllTodosByUserId, insertTodo, pool } from '../db/queries';
import { isLoggedInFuncion } from '../functions/isLoggedInFunction';
import { todo } from '../types/global';

export const getIndex = (req: Request, res: Response) => {
  res.render('index', { isLoggedIn: isLoggedInFuncion(req) });
};

export const getPanel = (req: Request, res: Response) => {
  res.render('panel');
};

export const getAllTodos = async (req: Request, res: Response) => {
  const { rows, rowCount } = await pool.query(findAllTodosByUserId, [
    req.session.userId,
  ]);
  const todos: todo[] = [];
  for (let row of rows) {
    const todo: todo = { title: row.title, todo_text: row.todo_text };
    todos.push(todo);
  }
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
  await pool.query(insertTodo, [title, todo, userId]);
  res.redirect('/panel/todos');
};
