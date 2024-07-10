import { knex } from '../db';
import { CreateOrganization } from './types';

export function createOrganization(organization: CreateOrganization) {
  return knex.insert(organization).into('organizations').returning('*');
}

export function getOrganization(id: number) {
  return knex.select('*').from('organizations').where('id', id).first();
}

export function getOrganizationsByUser(userId: number) {
  return knex.select('*').from('organizations').where('ownerId', userId);
}

export function updateOrganization(
  userId: number,
  organizationId: number,
  data: Partial<CreateOrganization>
) {
  return knex('organizations')
    .where({ ownerId: userId, id: organizationId })
    .update({ ...data, updatedAt: knex.fn.now() }, '*');
}
