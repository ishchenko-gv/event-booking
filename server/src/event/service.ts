import * as organizationService from '../organization/service';

import { CreateEvent } from './types';
import * as eventQueries from './queries';

export async function createEvent(userId: number, eventData: CreateEvent) {
  const isUserInOrganization =
    await organizationService.checkUserExistsInOrganization(
      userId,
      eventData.organizationId
    );

  if (!isUserInOrganization) throw new Error('Invalid user or organization');

  return eventQueries.createEvent(eventData);
}
