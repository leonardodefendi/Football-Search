import { ServiceResponse } from '../Interfaces/serviceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchsService {
  constructor(private matchModel = new MatchModel()) {}

  async getAllMatchs(): Promise<ServiceResponse<IMatch[]>> {
    const matchs = await this.matchModel.findAll();
    if (!matchs) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    return { status: 'SUCCESSFUL', data: matchs };
  }

  async getFiltredMatchs(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matchsFiltred = await this.matchModel.findMatchsFiltred(query);
    return { status: 'SUCCESSFUL', data: matchsFiltred };
  }
}
