import * as organizationQueries from './queries';

export function checkUserExistsInOrganization(
  userId: number,
  organizationId: number
) {
  return organizationQueries.getUserExistsInOrganization(
    userId,
    organizationId
  );
}
