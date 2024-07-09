import { knex } from '../db';
import { CreateOrganization } from './types';

export async function createOrganization(organization: CreateOrganization) {
  return knex.insert(organization).into('organizations').returning('*');
}
