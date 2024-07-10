import { Request, Response, NextFunction } from 'express';
import { NotFound, PermissionDenied } from '../exceptions';

export function checkExists(objectGetter: (id: number) => Promise<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const object = await objectGetter(+req.params.id);

      if (!object) throw new NotFound();

      next();
    } catch (err) {
      next(err);
    }
  };
}

export function checkOwner(
  objectGetter: (id: number) => Promise<{ ownerId: number }>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const object = await objectGetter(+req.params.id);

      if (!object) throw new NotFound();

      if (object.ownerId !== req.user!.id) throw new PermissionDenied();

      next();
    } catch (err) {
      next(err);
    }
  };
}
