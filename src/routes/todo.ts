import { Router } from 'express';
import {
  getIndex,
  getPanel,
  getAddTodo,
  postAddTodo,
  getAllTodos,
} from '../controllers/todo';
import { isLoggedIn } from '../middlewares/auth';

const router = Router();

router.get('/', getIndex);

router.get('/panel', isLoggedIn, getPanel);

router.get('/panel/todos', isLoggedIn, getAllTodos);

router.get('/panel/add', isLoggedIn, getAddTodo);

router.post('/panel/add', postAddTodo);

export = router;
