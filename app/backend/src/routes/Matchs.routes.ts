import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middlewares/auth';
import MatchsController from '../controllers/Matchs.controller';

const matchsRouter = Router();
const matchsController = new MatchsController();

matchsRouter.get(
  '/',
  AuthMiddleware.handle,
  (req: Request, res: Response) => matchsController.getAllMatchs(req, res),
);

export default matchsRouter;
