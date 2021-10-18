import { Router } from 'express';
import { get404, other404 } from '../controllers/404';

const router = Router();

router.get('*', get404);

router.all('*', other404);
