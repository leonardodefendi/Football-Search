import { Request, Response } from 'express';
import TeamService from '../services/Team.service';
import HTTPMap from '../utils/httpStatusMap';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamService.getAll();
    return res.status(HTTPMap(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getById(Number(id));
    return res.status(HTTPMap(status)).json(data);
  }
}
