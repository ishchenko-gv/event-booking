import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().max(300),
  ownerId: z.number(),
  contacts: z
    .object({
      phone: z.string().optional(),
    })
    .optional(),
});

export const organizationSchema = createOrganizationSchema.extend({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
