import { z } from 'zod';
import { createOrganizationSchema, organizationSchema } from './schemas';

export type CreateOrganization = z.infer<typeof createOrganizationSchema>;
export type Organization = z.infer<typeof organizationSchema>;
