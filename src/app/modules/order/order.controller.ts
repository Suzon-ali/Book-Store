import { Response, Request } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { RevenueServices } from '../revanue/revenue.service';
import { CustomerError } from '../errors/error.interface';

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
  } catch (error: unknown) {
    if (error instanceof CustomerError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      res.status(500).json({
        success: false,
        message: errorMessage,
        error: {
          message: errorMessage,
        },
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
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
  } catch (error: unknown) {
    if (error instanceof CustomerError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      res.status(500).json({
        success: false,
        message: errorMessage,
        error: {
          message: errorMessage,
        },
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
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
  } catch (error: unknown) {
    if (error instanceof CustomerError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      res.status(500).json({
        success: false,
        message: errorMessage,
        error: {
          message: errorMessage,
        },
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
  deleteOrder,
};
