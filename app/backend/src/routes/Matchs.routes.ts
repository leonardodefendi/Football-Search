import { Router, Request, Response } from 'express';
import MatchsController from '../controllers/Matchs.controller';

const matchsRouter = Router();
const matchsController = new MatchsController();

matchsRouter.get(
  '/',
  (req: Request, res: Response) => matchsController.getAllMatchs(req, res),
);

export default matchsRouter;
