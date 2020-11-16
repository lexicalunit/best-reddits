import L from '../../common/logger';
import data from '../../common/data';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  name: string;
  alert: number;
  notify: boolean;
}

export class UsersService {
  async all(): Promise<User[]> {
    L.info(data.users, 'fetch all users');
    return Promise.resolve(data.users);
  }

  async byId(id: string): Promise<User> {
    L.info(`fetch user with id ${id}`);
    const r = await this.all();
    return r.find((user) => user.id === id);
  }

  async create(name: string): Promise<User> {
    L.info(`create user with name ${name}`);
    const user: User = {
      id: uuid(),
      name,
      alert: 8, // default to 8am
      notify: true,
    };
    data.users.push(user);
    return Promise.resolve(user);
  }

  async update(id: string, name?: string, alert?: number, notify?: boolean): Promise<User> {
    L.info(`update user with id ${id}`);
    const user = await this.byId(id);
    if (user) {
      if (name) user.name = name;
      if (alert) user.alert = alert;
      if (notify !== undefined) user.notify = notify;
    }
    return user;
  }
}

export default new UsersService();
