import { Router } from 'express';
import teamRouter from './Team.routes';
import loginRouter from './Login.routes';
import matchsRouter from './Matchs.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchsRouter);

export default router;
