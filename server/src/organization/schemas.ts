import { z } from 'zod';

export const createOrganizationSchema = z
  .object({
    name: z.string().max(300),
    contacts: z
      .object({
        phone: z.string().optional(),
      })
      .optional(),
  })
  .strict();

export const organizationSchema = createOrganizationSchema.extend({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
