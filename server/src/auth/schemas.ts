import { z } from 'zod';

export const userCredentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Should be at least 8 characters long' }),
});

export const userSchema = userCredentialsSchema.extend({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
