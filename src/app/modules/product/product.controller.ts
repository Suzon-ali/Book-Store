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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted succesfully!',
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

const editProduct = async (req: Request, res: Response) => {
  try {
    const productId: string | undefined = req.params.productId;
    const updatedData = req.body;
    const valiatedData = productValidationSchema.parse(updatedData);
    const result = await ProductServices.ediProductFromDB(
      productId,
      valiatedData,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product Updated succesfully!',
        data: valiatedData,
      });
    }
  } catch (error) {
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
    const productId: string | undefined = req.params.productId;
    const categories = req.query.category as string | string[] | undefined;
    const titles = req.query.title as string | string[] | undefined;
    const authors = req.query.author as string | string[] | undefined;

    let result: TProduct | TProduct[] | null = null;

    if (productId) {
      result = await ProductServices.getSingleProductFromDB(productId);
    } else if (categories || titles || authors) {
      result = await ProductServices.getProducts({
        title: titles,
        category: categories,
        author: authors,
      });
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
  deleteProduct,
  editProduct,
};
