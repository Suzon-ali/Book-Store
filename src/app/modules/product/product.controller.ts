import { ProductServices } from './product.service';
import productValidationSchema, {
  productUpdateSchema,
} from './product.validation';
import { TProduct } from './product.interface';
import catchAsync from '../../utils/catchAsync';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const productValidatedData = productValidationSchema.parse(productData);
  const result =
    await ProductServices.createProductIntoDB(productValidatedData);
  res.status(200).json({
    success: true,
    message: 'Product created succesfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductServices.deleteProductFromDB(productId);
  res.status(200).json({
    success: true,
    message: 'Product deleted succesfully!',
    data: result,
  });
});

const editProduct = catchAsync(async (req, res) => {
  const productId: string | undefined = req.params.productId;
  const updatedData = req.body;
  const valiatedData = productUpdateSchema.parse(updatedData);
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
      data: result,
    });
  }
});

const getProducts = catchAsync(async (req, res) => {
  const productId: string | undefined = req.params.productId;
  const categories = req.query.category as string | string[] | undefined;
  const titles = req.query.title as string | string[] | undefined;
  const authors = req.query.author as string | string[] | undefined;
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10) || undefined
    : undefined;
  const page = req.query.page
    ? parseInt(req.query.page as string, 10) || undefined
    : undefined;

  let result: TProduct | TProduct[] | null = null;

  if (productId) {
    result = await ProductServices.getSingleProductFromDB(productId);
  } else if (categories || titles || authors || limit || page) {
    result = await ProductServices.getProducts({
      title: titles,
      category: categories,
      author: authors,
      limit,
      page,
    });
  } else {
    result = await ProductServices.getAllProductFromDB();
  }
  res.status(200).json({
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
  deleteProduct,
  editProduct,
};
