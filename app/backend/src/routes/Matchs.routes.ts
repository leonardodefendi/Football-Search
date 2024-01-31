import { Router, Request, Response } from 'express';
import MatchsController from '../controllers/Matchs.controller';
import AuthMiddleware from '../middlewares/auth';
import Validations from '../middlewares/validations';

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

matchsRouter.patch(
  '/:id',
  AuthMiddleware.handle,
  (req: Request, res: Response) => matchsController.updateScore(req, res),
);

matchsRouter.post(
  '/',
  AuthMiddleware.handle,
  Validations.validateTeam,
  (req: Request, res: Response) => matchsController.createMatch(req, res),
);

export default matchsRouter;
