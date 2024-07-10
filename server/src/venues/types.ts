import { z } from 'zod';

import { createVenueSchema, venueSchema } from './schemas';

export type CreateVenue = z.infer<typeof createVenueSchema>;
export type CreateOwnedVenue = CreateVenue & { ownerId: number };
export type Venue = z.infer<typeof venueSchema>;
