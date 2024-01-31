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

const totalPoints = (teamId: number, matches: IMatch[]): number => {
  const drawsHome = totalDrawsHome(teamId, matches) * 1;
  const drawsAway = totalDrawsAway(teamId, matches) * 1;
  const totalVictories = (totalVictoriesHome(teamId, matches)
   + totalVictoriesAway(teamId, matches)) * 3;
  const totalPoint = drawsHome + drawsAway + totalVictories;
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
  totalLosesHome,
  totalLosesAway,
  totalDrawsHome,
  totalDrawsAway,
  totalPoints,
  goalsFavor,
  goalsOwn,
};
