import { Router } from 'express';
import GetAllProducts from '../controllers/productController';
import Auth from './auth';

const productRouter = Router();

productRouter.get('/getAllProducts', Auth, GetAllProducts);

export default productRouter;
