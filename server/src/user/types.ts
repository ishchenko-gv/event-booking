import { z } from 'zod';

import { userCredentialsSchema, userSchema } from '../auth/schemas';

export type UserCredentials = z.infer<typeof userCredentialsSchema>;
export type User = z.infer<typeof userSchema>;

export type RequestUser = {
  id: number;
  email: string;
};
