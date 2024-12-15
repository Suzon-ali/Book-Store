import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const book = new Product(product);
  if (await book.isProductExist(product?.title)) {
    throw new Error('Product with this name alredy exist!');
  }
  const result = book.save();
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find();
  return result;
};

const ediProductFromDB = async (id: string, updatedData: Partial<TProduct>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid Product id!');
  }
  const result = await Product.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    { $set: updatedData },
    { new: true },
  );
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product id!');
  }
  const result = await Product.updateOne(
    { _id: productId },
    { isDeleted: true },
  );
  if (result && result.modifiedCount === 0) {
    throw new Error('Product not fund or already Deleted!');
  }
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product id!');
  }
  const result = await Product.findOne({ _id: productId });
  return result;
};

const getProducts = async (filters: {
  title?: string | string[];
  category?: string | string[];
  author?: string | string[];
}) => {
  const { title, category, author } = filters;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryCondition: any = {};

  if (title) {
    queryCondition.title = Array.isArray(title)
      ? { $or: title.map((t) => ({ $regex: t, $options: 'i' })) }
      : { $regex: title, $options: 'i' };
  }

  if (category) {
    queryCondition.category = Array.isArray(category)
      ? { $or: category.map((c) => ({ $regex: c, $options: 'i' })) }
      : { $regex: category, $options: 'i' };
  }

  if (author) {
    queryCondition.author = Array.isArray(author)
      ? { $or: author.map((a) => ({ $regex: a, $options: 'i' })) }
      : { $regex: author, $options: 'i' };
  }
  const result = await Product.find(queryCondition);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getProducts,
  deleteProductFromDB,
  ediProductFromDB,
};
