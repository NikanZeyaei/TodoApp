import express from 'express';
import { getIndex, getPanel } from '../controllers/todo';
import { isLoggedIn } from '../middlewares/auth';

const router = express.Router();

router.get('/', getIndex);

router.get('/panel', isLoggedIn, getPanel);

// router.get('/add', (req, res) => {
//   res.render('addtodo');
// });

// router.post('/add', (req, res) => {});

export = router;
