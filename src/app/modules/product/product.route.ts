import express from 'express';
import { ProductControllers } from './product.controler';

const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);
router.get('/', ProductControllers.getProducts);
router.get('/:id', ProductControllers.getProducts);

export const ProductRoutes = router;
