import { knex } from '../db';
import { UserCredentials } from './types';

export async function getUser(id: number) {
  return knex.select('*').from('users').where('id', id).first();
}

export async function getUserByEmail(email: string) {
  return knex.select('*').from('users').where('email', email).first();
}

export function createUser(user: UserCredentials) {
  return knex.insert(user).into('users');
}
