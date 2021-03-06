import L from '../../common/logger';
import data from '../../common/data';
import { v4 as uuid } from 'uuid';

export interface Favorite {
  id: string;
  link: string;
  user_id: string;
}

export class FavoritesService {
  async byUser(id: string): Promise<Favorite[]> {
    L.info(`fetch favorites for user with id ${id}`);
    return data.favorites.filter((favorite) => favorite.user_id === id);
  }

  async byId(id: string): Promise<Favorite> {
    L.info(`fetch favorite with id ${id}`);
    return data.favorites.find((favorite) => favorite.id === id);
  }

  async create(user_id: string, link: string): Promise<Favorite> {
    L.info(`create a favorite for user with id ${user_id} for the link ${link}`);
    const favorite: Favorite = {
      id: uuid(),
      user_id,
      link,
    };
    // Note: It might be helpful to de-dupe favorites.
    data.favorites.push(favorite);
    return Promise.resolve(favorite);
  }

  async delete(id: string): Promise<Favorite> {
    L.info(`delete favorite with id ${id}`);
    const index = data.favorites.findIndex((favorite) => favorite.id === id);
    if (index !== -1) {
      const deleted = data.favorites[index];
      data.favorites.splice(index, 1);
      return Promise.resolve(deleted);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export default new FavoritesService();
