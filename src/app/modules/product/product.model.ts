import { Aggregate, model, Schema } from 'mongoose';
import { ProductMethods, ProductModel, TProduct } from './product.interface';
import { NextFunction } from 'express';

const productSchema = new Schema<TProduct, ProductModel, ProductMethods>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//middlewares
productSchema.pre('find', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('findOne', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('aggregate', function (next: NextFunction) {
  const aggregate = this as Aggregate<any[]>;
  aggregate.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

productSchema.methods.isProductExist = async function (
  title: string,
): Promise<TProduct | null> {
  const existingProduct = await Product.findOne({ title });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
