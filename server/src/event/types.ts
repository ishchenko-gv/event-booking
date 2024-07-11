import { z } from 'zod';
import { createEventSchema, eventSchema } from './schemas';

export type CreateEvent = z.infer<typeof createEventSchema>;
export type Event = z.infer<typeof eventSchema>;
