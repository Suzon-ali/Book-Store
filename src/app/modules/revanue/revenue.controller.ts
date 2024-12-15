import { Request, Response } from 'express';
import { RevenueServices } from './revenue.service';
import { CustomerError } from '../errors/error.interface';

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await RevenueServices.getAllRevenue();

    res.status(200).json({
      success: true,
      message: 'Total revenue fetched successfully!',
      data: { totalRevenue: result },
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

export const RevenueControllers = {
  getRevenue,
};

export const revenueControllers = {
  getRevenue,
};
