import { z } from 'zod';

const productValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must not exceed 100 characters' }),

  author: z
    .string()
    .min(1, { message: 'Author is required' })
    .max(50, { message: 'Author name must not exceed 50 characters' }),

  price: z
    .number()
    .min(1, { message: 'Price cannot be less than $1' })
    .max(100000, { message: 'Price must not exceed $100,000' }),

  category: z
    .string()
    .min(1, { message: 'Category is required' })
    .max(50, { message: 'Category must not exceed 50 characters' }),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description must not exceed 1000 characters' }),

  quantity: z
    .number()
    .min(1, { message: 'Quantity cannot be less than 1' })
    .max(1000, { message: 'Quantity must not exceed 1000' }),

  inStock: z.boolean({ required_error: 'In stock status is required' }),
});

export default productValidationSchema;
