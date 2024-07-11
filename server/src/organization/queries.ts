import { knex } from '../db';
import { CreateOwnedOrganization } from './types';

export function createOrganization(organization: CreateOwnedOrganization) {
  return knex.transaction(async (trx) => {
    const inserted = await trx
      .insert(organization)
      .into('organizations')
      .returning('*');

    await trx('organizations_users_m2m').insert({
      userId: organization.ownerId,
      organizationId: inserted[0].id,
    });

    return inserted;
  });
}

export function getOrganization(id: number) {
  return knex.select('*').from('organizations').where('id', id).first();
}

export function getOrganizationsByUser(userId: number) {
  return knex.select('*').from('organizations').where({ ownerId: userId });
}

export function updateOrganization(
  userId: number,
  organizationId: number,
  data: Partial<CreateOwnedOrganization>
) {
  return knex('organizations')
    .where({ ownerId: userId, id: organizationId })
    .update({ ...data, updatedAt: knex.fn.now() }, '*');
}

export function deleteOrganization(userId: number, organizationId: number) {
  return knex('organizations')
    .where({ ownerId: userId, id: organizationId })
    .delete()
    .returning('id');
}

export function getUserExistsInOrganization(
  userId: number,
  organizationId: number
) {
  const inner = knex('organizations_users_m2m').whereRaw(
    'user_id = ? and organization_id = ?',
    [userId, organizationId]
  );

  const exists = knex.raw(inner).wrap('exists (', ')');

  return knex('organizations_users_m2m').select(exists).limit(1);
}
