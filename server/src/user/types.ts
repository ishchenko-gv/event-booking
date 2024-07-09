import { z } from 'zod';

import { userCredentialsSchema, userSchema } from '../auth/schema';

export type UserCredentials = z.infer<typeof userCredentialsSchema>;
export type User = z.infer<typeof userSchema>;
