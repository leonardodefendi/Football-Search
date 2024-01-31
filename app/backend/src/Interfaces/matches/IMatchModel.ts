import { ICRUDModelReader } from '../ICRUDModel';
import { IMatch } from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findMatchsFiltred(query: string): Promise<IMatch[]>;
  patchInprogress(id: number): Promise<void>;
  updateScore(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void>
}
