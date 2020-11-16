import L from '../../common/logger';
import data from '../../common/data';
import uuid from 'uuid';

export interface Favorite {
  id: string;
  link: string;
  user_id: string;
}

export class FavoritesService {
  async all(): Promise<Favorite[]> {
    L.info(data.favorites, 'fetch all favorites');
    return Promise.resolve(data.favorites);
  }

  async byId(id: string): Promise<Favorite> {
    L.info(`fetch favorite with id ${id}`);
    const r = await this.all();
    return r.find((favorite) => favorite.id == id);
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
}

export default new FavoritesService();