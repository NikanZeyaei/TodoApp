import { Router } from 'express';
import { getIndex, getPanel } from '../controllers/todo';
import { isLoggedIn } from '../middlewares/auth';

const router = Router();

router.get('/', getIndex);

router.get('/panel', isLoggedIn, getPanel);

export = router;
