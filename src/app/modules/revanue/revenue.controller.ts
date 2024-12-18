import { RevenueServices } from './revenue.service';
import catchAsync from '../../utils/catchAsync';

const getRevenue = catchAsync(async (req, res) => {
  const result = await RevenueServices.getAllRevenue();

  res.status(200).json({
    success: true,
    message: 'Total revenue fetched successfully!',
    data: { totalRevenue: result },
  });
});

export const RevenueControllers = {
  getRevenue,
};
