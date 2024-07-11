import { knex } from '../db';

import { CreateEvent } from './types';

export function createEvent(event: CreateEvent) {
  return knex('events').insert(event).returning('*');
}

export function getEvents(limit: number = 10, offset: number = 0) {
  return knex
    .select('*')
    .from('events')
    .orderBy('startDate', 'desc')
    .limit(limit)
    .offset(offset);
}

export function updateEvent(id: number, event: Partial<CreateEvent>) {
  return knex('events')
    .where({ id })
    .update({ ...event, updatedAt: knex.fn.now() }, '*');
}

export function deleteEvent(id: number) {
  return knex('events').where({ id }).delete().returning('*');
}
