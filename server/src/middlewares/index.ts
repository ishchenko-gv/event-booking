import { Request, Response, NextFunction } from 'express';

import { NotFound, PermissionDenied } from '../exceptions';

export function checkOwner(
  objectGetter: (id: number) => Promise<{ ownerId: number }>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const object = await objectGetter(+req.params.id);

      if (!object) throw new NotFound();

      if (object.ownerId !== req.user!.id) throw new PermissionDenied();

      res.locals.object = object;

      next();
    } catch (err) {
      next(err);
    }
  };
}
