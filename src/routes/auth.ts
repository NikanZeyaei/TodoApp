import Express from 'express';
import {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  postLogout,
} from '../controllers/auth';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth';

const router = Express.Router();

router.get('/login', isNotLoggedIn, getLogin);

router.get('/register', isNotLoggedIn, getRegister);

router.post('/login', isNotLoggedIn, postLogin);

router.post('/register', isNotLoggedIn, postRegister);

router.post('/logout', isLoggedIn, postLogout);

export = router;
