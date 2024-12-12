import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

//product routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World2!');
});

export default app;
