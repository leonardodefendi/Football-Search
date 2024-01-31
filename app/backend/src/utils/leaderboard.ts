import { IMatch } from '../Interfaces/matches/IMatch';

const totalGames = (teamId: number, matches: IMatch[]): number => {
  const games = matches
    .filter((match) => teamId === match.awayTeamId || teamId === match.homeTeamId);
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

const totalLoses = (teamId: number, matches: IMatch[]): number => {
  const losesHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  const losesAway = matches.filter((match) =>
    match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
  const total = losesHome.length + losesAway.length;
  return total;
};

const totalDraws = (teamId: number, matches: IMatch[]): number => {
  const drawsHome = matches.filter((match) =>
    match.homeTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals);
  const drawsAway = matches.filter((match) =>
    match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals);
  const total = drawsAway.length + drawsHome.length;
  return total;
};

const totalPoints = (teamId: number, matches: IMatch[]): number => {
  const draws = totalDraws(teamId, matches) * 1;
  const totalVictories = (totalVictoriesHome(teamId, matches)
   + totalVictoriesAway(teamId, matches)) * 3;
  const totalPoint = draws + totalVictories;
  return totalPoint;
};

const goalsFavor = (teamId: number, matches: IMatch[]): number => {
  const goalsHome = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.homeTeamId === teamId) {
      soma += curr.homeTeamGoals;
    }
    if (curr.awayTeamId === teamId) {
      soma += curr.awayTeamGoals;
    }
    return soma;
  }, 0);
  return goalsHome;
};

const goalsOwn = (teamId: number, matches: IMatch[]): number => {
  const goals = matches.reduce((acc, curr) => {
    let soma = acc;
    if (curr.homeTeamId === teamId) {
      soma += curr.awayTeamGoals;
    }
    if (curr.awayTeamId === teamId) {
      soma += curr.homeTeamGoals;
    }
    return soma;
  }, 0);
  return goals;
};

export {
  totalGames,
  totalVictoriesHome,
  totalVictoriesAway,
  totalLoses,
  totalDraws,
  totalPoints,
  goalsFavor,
  goalsOwn,
};
