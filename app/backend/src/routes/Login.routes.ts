import { Router, Request, Response } from 'express';
import Validations from '../middlewares/validations';
import UserController from '../controllers/User.controller';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLoginFields,
  (req: Request, res: Response) => userController.login(req, res),
);

export default loginRouter;
