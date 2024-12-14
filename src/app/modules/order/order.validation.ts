import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid Email Format' }),
  product: z.string(),
  quantity: z
    .number()
    .min(0, { message: 'quantity must need to be more than 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must need to be more than 0' }),
  isDeleted: z.boolean().optional(),
});

export default orderValidationSchema;
