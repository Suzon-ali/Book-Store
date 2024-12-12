import { Model } from 'mongoose';

export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

export type ProductMethods = {
  // eslint-disable-next-line no-unused-vars
  isProductExist(title: string): Promise<TProduct | null>;
};

export type ProductModel = Model<TProduct, unknown, ProductMethods>;
