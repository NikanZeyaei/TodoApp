import { Router } from 'express';
import { get404 } from '../controllers/404';

const router = Router();

router.use(get404);

export = router;
