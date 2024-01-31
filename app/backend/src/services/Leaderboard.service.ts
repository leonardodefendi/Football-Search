import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { goalsFavorHome, goalsOwnHome, totalDrawsHome,
  totalGamesHome,
  totalLosesHome,
  goalsBalanceHome,
  totalPointsHome,
  efficiencyHome,
  totalVictoriesHome,
  sortTeams } from '../utils/leaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getAllLeaderHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findMatchsFiltred('false');
    const homeMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsHome(team.id, matches),
      totalGames: totalGamesHome(team.id, matches),
      totalVictories: totalVictoriesHome(team.id, matches),
      totalDraws: totalDrawsHome(team.id, matches),
      totalLosses: totalLosesHome(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches),
      goalsBalance: goalsBalanceHome(team.id, matches),
      efficiency: efficiencyHome(team.id, matches),
    }));
    sortTeams(homeMatches);
    return { status: 'SUCCESSFUL', data: homeMatches };
  }
}
