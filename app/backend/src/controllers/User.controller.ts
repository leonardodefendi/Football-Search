import { Request, Response } from 'express';
import HTTPMap from '../utils/httpStatusMap';
import UsersService from '../services/Users.service';

export default class UserController {
  constructor(private userService = new UsersService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);
    return res.status(HTTPMap(status)).json(data);
  }

  public static async roleToken(_req:Request, res: Response) {
    const { role } = res.locals.auth;
    return res.status(200).json({ role });
  }
}
