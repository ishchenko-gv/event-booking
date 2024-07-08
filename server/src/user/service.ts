import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as userQueries from './queries';
import { InvalidUserOrPasswordError } from './exceptions';

export async function signup(email: string, password: string) {
  const passHash = await bcrypt.hash(password, 10);

  await userQueries.createUser({ email, password: passHash });
}

export async function login(email: string, password: string) {
  const user = await userQueries.getUserByEmail(email);

  if (!user) throw new InvalidUserOrPasswordError("User doesn't exist");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new InvalidUserOrPasswordError('Invalid password');

  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: 60 * 60,
  };

  return jwt.sign(payload, process.env.SECRET!, options);
}
