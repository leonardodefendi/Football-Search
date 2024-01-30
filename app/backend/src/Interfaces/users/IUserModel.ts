import { ICRUDModelReader } from '../ICRUDModel';
import { IUser } from './IUser';

export interface IUserModel extends ICRUDModelReader<IUser> {
  findByUserEmail(email: string): Promise<IUser | null>;
}
