import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';
import { RevenueRoutes } from './app/modules/revanue/revenue.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/orders/revenue', RevenueRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
