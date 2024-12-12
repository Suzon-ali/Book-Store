import { model, Schema } from 'mongoose';
import { ProductMethods, ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel, ProductMethods>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

productSchema.methods.isProductExist = async function (
  title: string,
): Promise<TProduct | null> {
  const existingProduct = await Product.findOne({ title });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
