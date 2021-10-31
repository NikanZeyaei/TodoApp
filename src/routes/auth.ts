import { Router } from 'express';
import {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  postLogout,
  getResetPassword,
  postResetPassword,
  getTokenVerification,
  postNewPassword,
} from '../controllers/auth';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth';

const router = Router();

router.get('/login', isNotLoggedIn, getLogin);

router.get('/register', isNotLoggedIn, getRegister);

router.post('/login', isNotLoggedIn, postLogin);

router.post('/register', isNotLoggedIn, postRegister);

router.post('/logout', isLoggedIn, postLogout);

router.get('/reset', isNotLoggedIn, getResetPassword);

router.post('/reset', isNotLoggedIn, postResetPassword);

router.get('/reset/:token', isNotLoggedIn, getTokenVerification);

router.post('/new-password', isNotLoggedIn, postNewPassword);

export = router;
