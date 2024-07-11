import { Router } from 'express';

import { authRequired } from '../auth/middlewares';

import { createEventSchema } from './schemas';
import * as eventService from './service';

export const eventRouter = Router();

eventRouter.post('/', authRequired, async (req, res, next) => {
  try {
    const eventData = createEventSchema.parse(req.body);
    const event = await eventService.createEvent(req.user!.id, eventData);

    res.send(event);
  } catch (err) {
    next(err);
  }
});
