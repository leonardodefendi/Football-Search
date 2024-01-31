import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAllHome(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllLeaderHome();
    return res.status(200).json(data);
  }

  async getAllAway(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllLeaderAway();
    res.status(200).json(data);
  }
}
