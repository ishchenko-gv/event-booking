import { z } from 'zod';

export const createVenueSchema = z
  .object({
    name: z.string().max(300),
    locationLat: z.number(),
    locationLong: z.number(),
    address: z.string(),
  })
  .strict();

export const venueSchema = createVenueSchema.extend({
  id: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
