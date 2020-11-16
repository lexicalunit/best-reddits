import L from '../../common/logger';
import data from '../../common/data';
import uuid from 'uuid';

export interface User {
  id: string;
  name: string;
}

export class UsersService {
  async all(): Promise<User[]> {
    L.info(data.users, 'fetch all users');
    return Promise.resolve(data.users);
  }

  async byId(id: string): Promise<User> {
    L.info(`fetch user with id ${id}`);
    const r = await this.all();
    return r.find((user) => user.id == id);
  }

  async create(name: string): Promise<User> {
    L.info(`create user with name ${name}`);
    const user: User = {
      id: uuid.v4(),
      name,
    };
    data.users.push(user);
    return Promise.resolve(user);
  }
}

export default new UsersService();
