import { Router } from 'express';

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

export { organizationRouter };
