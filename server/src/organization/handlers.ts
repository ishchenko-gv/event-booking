import { Router } from 'express';

import { authRequired } from '../auth';
import { checkOwner } from '../../middlewares';

import { createOrganizationSchema } from './schemas';
import * as organizationQueries from './queries';

const organizationRouter = Router();

organizationRouter.post('/', async (req, res, next) => {
  try {
    const organizationData = createOrganizationSchema.parse(req.body);
    const organization =
      await organizationQueries.createOrganization(organizationData);

    res.status(201).send(organization);
  } catch (err) {
    next(err);
  }
});

organizationRouter.get('/', authRequired, async (req, res, next) => {
  try {
    const organizations = await organizationQueries.getOrganizationsByUser(
      req.user!.id
    );

    res.json(organizations);
  } catch (err) {
    next(err);
  }
});

organizationRouter.put(
  '/:id',
  authRequired,
  checkOwner(organizationQueries.getOrganization),
  async (req, res, next) => {
    try {
      const organizationData = createOrganizationSchema
        .partial()
        .parse(req.body);

      const updatedOrganization = await organizationQueries.updateOrganization(
        req.user!.id,
        +req.params.id,
        organizationData
      );

      res.send(updatedOrganization);
    } catch (err) {
      next(err);
    }
  }
);

export { organizationRouter };
