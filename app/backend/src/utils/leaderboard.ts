import { IMatch } from '../Interfaces/matches/IMatch';

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
  console.log(teamId, victories.length);
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
};
