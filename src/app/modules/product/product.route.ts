import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getProducts);
router.get('/:productId', ProductControllers.getProducts);
router.put('/:productId', ProductControllers.editProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
