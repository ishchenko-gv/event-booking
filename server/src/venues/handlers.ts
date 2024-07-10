import { Router } from 'express';

import { authRequired } from '../auth';
import { createVenueSchema } from './schemas';
import * as venueQueries from './queries';
import { checkOwner } from '../../middlewares';

export const venueRouter = Router();

venueRouter.post('/', authRequired, async (req, res, next) => {
  try {
    const venueData = createVenueSchema.parse(req.body);
    const ownedVenue = {
      ...venueData,
      ownerId: req.user!.id,
    };

    const venue = await venueQueries.createVenue(ownedVenue);

    res.status(201).send(venue);
  } catch (err) {
    next(err);
  }
});

venueRouter.get('/owned', authRequired, async (req, res, next) => {
  try {
    const venues = await venueQueries.getVenuesByUser(req.user!.id);

    res.send(venues);
  } catch (err) {
    next(err);
  }
});

venueRouter.get(
  '/:id',
  authRequired,
  checkOwner(venueQueries.getVenue),
  (_, res) => {
    res.send(res.locals.object);
  }
);

venueRouter.put(
  '/:id',
  authRequired,
  checkOwner(venueQueries.getVenue),
  async (req, res, next) => {
    try {
      const venueData = createVenueSchema.partial().parse(req.body);

      const venue = await venueQueries.updateVenue(
        req.user!.id,
        +req.params.id,
        venueData
      );

      res.send(venue);
    } catch (err) {
      next(err);
    }
  }
);

venueRouter.delete(
  '/:id',
  authRequired,
  checkOwner(venueQueries.getVenue),
  async (req, res, next) => {
    try {
      const venueId = await venueQueries.deleteVenue(
        req.user!.id,
        +req.params.id
      );

      res.send(venueId);
    } catch (err) {
      next(err);
    }
  }
);
