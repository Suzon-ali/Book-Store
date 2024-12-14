import { Response, Request } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const orderValitedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(orderValitedData);
    res.status(200).json({
      success: true,
      message: 'Order placed succesfully',
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage || 'Something is wrong',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const email = req.query.email as string | undefined;
    if (email) {
      result = await OrderServices.getOrderByEmail(email);
    } else {
      result = await OrderServices.getOrderFromDB();
    }
    res.status(200).json({
      success: true,
      message: 'Order fethced succesfully',
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage || 'Something is wrong',
      error: error,
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await OrderServices.deleteOrderById(id);
    res.status(200).json({
      success: true,
      message: 'Order Deleted Successfully!',
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage || 'Something is wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
  deleteOrder,
};
