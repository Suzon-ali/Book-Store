import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders);
router.get('/:productId', OrderControllers.getOrders);
router.delete('/:productId', OrderControllers.deleteOrder);

export const OrderRoutes = router;
