import { Request, Response } from 'express';
import HTTPMap from '../utils/httpStatusMap';
import MatchsService from '../services/Matchs.service';

export default class MatchsController {
  constructor(private matchService = new MatchsService()) {}

  async getAllMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchService.getAllMatchs();
      return res.status(HTTPMap(status)).json(data);
    }
    const { status, data } = await this.matchService.getFiltredMatchs(inProgress.toString());
    return res.status(HTTPMap(status)).json(data);
  }
}
