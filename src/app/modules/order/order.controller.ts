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

export const OrderControllers = {
  createOrder,
};
