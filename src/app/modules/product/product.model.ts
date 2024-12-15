import { Aggregate, model, Schema } from 'mongoose';
import { ProductMethods, ProductModel, TProduct } from './product.interface';
import { NextFunction } from 'express';

const productSchema = new Schema<TProduct, ProductModel, ProductMethods>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      unique: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be at least 0'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
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
productSchema.pre('updateOne', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('findOneAndUpdate', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('aggregate', function (next: NextFunction) {
  const aggregate = this as Aggregate<{ isDeleted: true }>;
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
