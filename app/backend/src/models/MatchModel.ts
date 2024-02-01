import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatches from '../database/models/MatchesModel';
import SequelizeTeam from '../database/models/TeamsModel';
import { MatchInfos } from '../Interfaces/matches/MatchTypes';

export default class MatchModel implements IMatchModel {
  private matchsModel = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const teams = await this.matchsModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return teams;
  }

  async findMatchsFiltred(query: string): Promise<IMatch[]> {
    const progress = query === 'true';
    const teams = await this.matchsModel.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return teams;
  }

  async patchInprogress(id: number): Promise<void> {
    await this.matchsModel.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.matchsModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async create(matchInfos: MatchInfos): Promise<IMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId } = matchInfos;

    const created = await this.matchsModel
      .create({ homeTeamGoals, homeTeamId, awayTeamGoals, awayTeamId, inProgress: true });
    return created;
  }
}
