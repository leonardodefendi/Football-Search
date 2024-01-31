import { Router, Request, Response } from 'express';
import MatchsController from '../controllers/Matchs.controller';
import AuthMiddleware from '../middlewares/auth';

const matchsRouter = Router();
const matchsController = new MatchsController();

matchsRouter.get(
  '/',
  (req: Request, res: Response) => matchsController.getAllMatchs(req, res),
);

matchsRouter.patch(
  '/:id/finish',
  AuthMiddleware.handle,
  (req: Request, res: Response) => matchsController.updateProgress(req, res),
);

export default matchsRouter;
