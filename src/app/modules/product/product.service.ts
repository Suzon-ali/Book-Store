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
  const result = Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
