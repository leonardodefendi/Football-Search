import { IMatch, LeaderboardType } from '../Interfaces/matches/IMatch';

const totalGamesHome = (teamId: number, matches: IMatch[]): number => {
  const games = matches
    .filter((match) => teamId === match.homeTeamId);
  return games.length;
};
const totalGamesAway = (teamId: number, matches: IMatch[]): number => {
  const games = matches
    .filter((match) => teamId === match.awayTeamId);
  return games.length;
};

const totalVictoriesHome = (teamId: number, matches: IMatch[]): number => {
  const victories = matches.filter((match) =>
    match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals);
  return victories.length;
};

const totalVictoriesAway = (teamId: number, matches: IMatch[]): number => {
  const victories = matches.filter((match) =>
    match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals);
  return victories.length;
};

const totalLosesHome = (teamId: number, matches: IMatch[]): number => {
  const losesHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  return losesHome.length;
};
const totalLosesAway = (teamId: number, matches: IMatch[]): number => {
  const losesAway = matches.filter((match) =>
    match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
  return losesAway.length;
};

const totalDrawsHome = (teamId: number, matches: IMatch[]): number => {
  const drawsHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals);
  return drawsHome.length;
};
const totalDrawsAway = (teamId: number, matches: IMatch[]): number => {
  const drawsAway = matches.filter((match) =>
    match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals);
  return drawsAway.length;
};

const totalPointsHome = (teamId: number, matches: IMatch[]): number => {
  const drawsHome = totalDrawsHome(teamId, matches) * 1;
  const totalVictories = totalVictoriesHome(teamId, matches) * 3;
  const totalPoint = drawsHome + totalVictories;
  return totalPoint;
};
const totalPointsAway = (teamId: number, matches: IMatch[]): number => {
  const drawsAway = totalDrawsAway(teamId, matches) * 1;
  const totalVictories = totalVictoriesAway(teamId, matches) * 3;
  const totalPoint = drawsAway + totalVictories;
  return totalPoint;
};

const totalPointsAll = (teamId: number, matches: IMatch[]): number => {
  const draws = (totalDrawsAway(teamId, matches) + totalDrawsHome(teamId, matches)) * 1;
  const totalVictories = (totalVictoriesHome(teamId, matches)
  + totalVictoriesAway(teamId, matches)) * 3;
  const totalPoints = draws + totalVictories;
  return totalPoints;
};

const goalsFavorHome = (teamId: number, matches: IMatch[]): number => {
  const goalsHome = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.homeTeamId === teamId) {
      soma += curr.homeTeamGoals;
    }
    return soma;
  }, 0);
  return goalsHome;
};
const goalsFavorAway = (teamId: number, matches: IMatch[]): number => {
  const goalsAway = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.awayTeamId === teamId) {
      soma += curr.awayTeamGoals;
    }
    return soma;
  }, 0);
  return goalsAway;
};

const goalsOwnHome = (teamId: number, matches: IMatch[]): number => {
  const goals = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.homeTeamId === teamId) {
      soma += curr.awayTeamGoals;
    }
    return soma;
  }, 0);
  return goals;
};
const goalsOwnAway = (teamId: number, matches: IMatch[]): number => {
  const goals = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.awayTeamId === teamId) {
      soma += curr.homeTeamGoals;
    }
    return soma;
  }, 0);
  return goals;
};
const goalsBalanceHome = (teamId: number, matches: IMatch[]): number => {
  const golsFavor = goalsFavorHome(teamId, matches);
  const goalsOwn = goalsOwnHome(teamId, matches);
  const goalsBalance = golsFavor - goalsOwn;
  return goalsBalance;
};
const goalsBalanceAway = (teamId: number, matches: IMatch[]): number => {
  const golsFavor = goalsFavorAway(teamId, matches);
  const goalsOwn = goalsOwnAway(teamId, matches);
  const goalsBalance = golsFavor - goalsOwn;
  return goalsBalance;
};

const efficiencyHome = (teamId: number, matches: IMatch[]): string => {
  const P = totalPointsHome(teamId, matches);
  const J = totalGamesHome(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};
const efficiencyAway = (teamId: number, matches: IMatch[]): string => {
  const P = totalPointsAway(teamId, matches);
  const J = totalGamesAway(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const efficiencyTotal = (teamId: number, matches: IMatch[]): string => {
  const P = totalPointsAway(teamId, matches) + totalPointsHome(teamId, matches);
  const J = totalGamesAway(teamId, matches) + totalGamesHome(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const sortTeams = (team: LeaderboardType[]): LeaderboardType[] => {
  team.sort((a, b) => b.totalPoints - a.totalPoints
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor);
  return team;
};

export {
  totalGamesHome,
  totalGamesAway,
  totalVictoriesHome,
  totalVictoriesAway,
  totalLosesHome,
  totalLosesAway,
  totalDrawsHome,
  totalDrawsAway,
  totalPointsHome,
  totalPointsAway,
  goalsFavorHome,
  goalsFavorAway,
  goalsOwnHome,
  goalsOwnAway,
  goalsBalanceHome,
  efficiencyHome,
  sortTeams,
  goalsBalanceAway,
  efficiencyAway,
  efficiencyTotal,
  totalPointsAll,
};
