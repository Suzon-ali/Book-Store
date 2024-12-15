import mongoose from 'mongoose';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';

const createOrderIntoDB = async (newOrder: TOrder) => {
  const product = await Product.findOne({ _id: newOrder?.product });
  if (!product) {
    throw new Error('Product not found!');
  }
  if (product.quantity < newOrder.quantity) {
    throw new Error('Insufficient Product Quantity');
  }
  const order = new Order(newOrder);
  const result = await order.save();
  if (result) {
    const newQuantity = product.quantity - newOrder.quantity;
    await Product.updateOne(
      { _id: newOrder?.product },
      { quantity: newQuantity, inStock: newQuantity > 0 },
    );
  }
  return result;
};

const getOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getOrderByEmail = async (email: string) => {
  const result = await Order.aggregate([{ $match: { email: email } }]);
  return result;
};

const getOrderById = async (id: string) => {
  const result = await Order.findOne({ _id: id });
  return result;
};

const deleteOrderById = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product id!');
  }
  const result = await Order.updateOne({ _id: productId }, { isDeleted: true });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getOrderFromDB,
  deleteOrderById,
  getOrderByEmail,
  getOrderById,
};
