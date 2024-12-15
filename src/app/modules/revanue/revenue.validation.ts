import { z } from 'zod';

const revenueValitionSchema = z.object({
  totalrevenue: z.number(),
});

export default revenueValitionSchema;
