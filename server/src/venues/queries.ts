import { knex } from '../db';
import { CreateOwnedVenue } from './types';

export function createVenue(venue: CreateOwnedVenue) {
  return knex('venues').insert(venue).returning('*');
}

export function getVenue(id: number) {
  return knex.select('*').from('venues').where('id', id).first();
}

export function getVenuesByUser(userId: number) {
  return knex.select('*').from('venues').where({ ownerId: userId });
}

export function updateVenue(
  userId: number,
  venueId: number,
  data: Partial<CreateOwnedVenue>
) {
  return knex('venues')
    .where({ ownerId: userId, id: venueId })
    .update({ ...data, updatedAt: knex.fn.now() }, '*');
}

export function deleteVenue(userId: number, venueId: number) {
  return knex('venues')
    .where({ ownerId: userId, id: venueId })
    .delete()
    .returning('id');
}
