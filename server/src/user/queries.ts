import { knex } from '../db';
import { CreateUser } from './types';

export async function getUser(id: number) {
  const users = await knex.select('*').from('users').where('id', id);
  return users[0];
}

export async function getUserByEmail(email: string) {
  const users = await knex.select('*').from('users').where('email', email);
  return users[0];
}

export function createUser(user: CreateUser) {
  return knex.insert(user).into('users');
}
