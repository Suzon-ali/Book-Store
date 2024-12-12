import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { TProduct } from './product.interface';

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
    const id: string | undefined = req.params.id;
    let result: TProduct | TProduct[] | null = null;

    if (id) {
      result = await ProductServices.getSingleProductFromDB(id);
    } else {
      result = await ProductServices.getAllProductFromDB();
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
};
