import { z } from 'zod';

export const createEventSchema = z
  .object({
    name: z.string().max(300),
    description: z.string(),
    type: z.string().max(100),
    startDate: z.date(),
    endDate: z.date(),
    organizationId: z.number(),
    venueId: z.number(),
  })
  .strict();

export const eventSchema = createEventSchema.extend({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
