import express from 'express';
import { RevenueControllers } from './revenue.controller';

const router = express.Router();

router.get('/', RevenueControllers.getRevenue);

export const RevenueRoutes = router;
