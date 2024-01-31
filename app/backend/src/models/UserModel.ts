import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUsers from '../database/models/UsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async findByUserEmail(email: string): Promise<IUser | null> {
    const [user] = await this.model.findAll({ where: { email } });
    if (!user) return null;
    return user;
  }
}
