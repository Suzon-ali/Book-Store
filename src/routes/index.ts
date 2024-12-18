import { Router } from 'express';
import { ProductRoutes } from '../app/modules/product/product.route';
import { OrderRoutes } from '../app/modules/order/order.route';
import { RevenueRoutes } from '../app/modules/revanue/revenue.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/orders/revenue',
    route: RevenueRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
