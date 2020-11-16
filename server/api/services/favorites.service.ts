import L from '../../common/logger';
import data from '../../common/data';
import uuid from 'uuid';

export interface Favorite {
  id: string;
  link: string;
  user_id: string;
}

export class FavoritesService {
  async byId(id: string): Promise<Favorite> {
    L.info(`fetch favorite with id ${id}`);
    return data.favorites.find((favorite) => favorite.id === id);
  }

  async create(user_id: string, link: string): Promise<Favorite> {
    L.info(`create a favorite user id ${user_id} for the link ${link}`);
    const favorite: Favorite = {
      id: uuid.v4(),
      user_id,
      link,
    };
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
