import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { goalsFavor, goalsOwn, totalDraws, totalGames, totalLoses,
  totalPoints,
  totalVictoriesAway, totalVictoriesHome } from '../utils/leaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getAllHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findMatchsFiltred('false');
    const homeMatches = teams.map((team) => ({
      name: team.teamName,
      totalGames: totalGames(team.id, matches),
      totalVictories: totalVictoriesHome(team.id, matches) + totalVictoriesAway(team.id, matches),
      totalLosses: totalLoses(team.id, matches),
      totalDraws: totalDraws(team.id, matches),
      totalPoints: totalPoints(team.id, matches),
      goalsFavor: goalsFavor(team.id, matches),
      goalsOwn: goalsOwn(team.id, matches),
    }));
    return { status: 'SUCCESSFUL', data: homeMatches };
  }
}
