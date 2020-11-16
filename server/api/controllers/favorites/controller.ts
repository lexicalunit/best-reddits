import FavoritesService from '../../services/favorites.service';
import { Request, Response } from 'express';

export class Controller {
  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    FavoritesService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    FavoritesService.create(req.body.user_id, req.body.link).then((r) => {
      res.status(200).json(r);
    });
  }

  delete(req: Request, res: Response): void {
    const id = req.params['id'];
    FavoritesService.delete(id).then((r) => {
      if (r) res.status(204).end();
      else res.status(404).end();
    });
  }
}
export default new Controller();
