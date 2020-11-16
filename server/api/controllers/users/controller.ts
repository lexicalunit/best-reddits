import UsersService from '../../services/users.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    UsersService.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    UsersService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    UsersService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1/users/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void {
    if (req.body.alert < 0 || req.body.alert >= 24) {
      res.status(400).json({ error: 'alert hour must be between 0 and 23' });
      return;
    }

    const id = req.params['id'];
    UsersService.update(id, req.body.name, req.body.alert, req.body.notify).then((r) => {
      if (r) res.status(200).json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
