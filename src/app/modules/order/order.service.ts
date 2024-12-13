import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (newOrder: TOrder) => {
  const order = new Order(newOrder);
  const result = await order.save();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
