import { Router } from 'express';
import { authRequired } from '../auth/middlewares';
import { createEventSchema } from './schemas';

export const eventRouter = Router();

eventRouter.post('/', authRequired, async (req, res, next) => {
  try {
    const eventData = createEventSchema.parse(req.body);
  } catch (err) {
    next(err);
  }
});
