import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const productValidatedData = productValidationSchema.parse(productData);
    const result =
      await ProductServices.createProductIntoDB(productValidatedData);
    res.status(200).json({
      success: true,
      message: 'Product created succesfully!',
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage || 'Something is wrong',
      error: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (id) {
      const result = await ProductServices.getSingleProductFromDB(id);
      res.status(200).json({
        success: true,
        message: 'Product fetched succesfully!',
        data: result,
      });
    }
    if (!id) {
      const result = await ProductServices.getAllProductFromDB();
      res.status(200).json({
        success: true,
        message: 'Product fetched succesfully!',
        data: result,
      });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage || 'Something is wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
};
