import L from '../../common/logger';

let id = 0;
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: id++, name: 'Amy Troschinetz' },
  { id: id++, name: 'Maggie Mari' },
  { id: id++, name: 'Bryan Van de Ven' },
  { id: id++, name: 'Samantha Hughes' },
];

export class UsersService {
  async all(): Promise<User[]> {
    L.info(users, 'fetch all users');
    return Promise.resolve(users);
  }

  async byId(id: number): Promise<User> {
    L.info(`fetch user with id ${id}`);
    const r = await this.all();
    return r[id];
  }

  async create(name: string): Promise<User> {
    L.info(`create user with name ${name}`);
    const user: User = {
      id: id++,
      name,
    };
    users.push(user);
    return Promise.resolve(user);
  }
}

export default new UsersService();
