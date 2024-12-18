import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { RevenueServices } from '../revanue/revenue.service';
import catchAsync from '../../utils/catchAsync';

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;
  const orderValitedData = orderValidationSchema.parse(orderData);
  const result = await OrderServices.createOrderIntoDB(orderValitedData);
  res.status(200).json({
    success: true,
    message: 'Order placed succesfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  let result;
  const id = req.params.productId;
  const email = req.query.email as string | undefined;
  if (email) {
    result = await OrderServices.getOrderByEmail(email);
  } else if (id && id === 'revenue') {
    result = await RevenueServices.getAllRevenue();
  } else if (id) {
    result = await OrderServices.getOrderById(id);
  } else {
    result = await OrderServices.getOrderFromDB();
  }
  res.status(200).json({
    success: true,
    message: 'Data fethced succesfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const result = await OrderServices.deleteOrderById(id);
  res.status(200).json({
    success: true,
    message: 'Order Deleted Successfully!',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getOrders,
  deleteOrder,
};
