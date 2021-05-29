import express from 'express';
import logger from '../log/logger';
import ProductService from '../services/productService';

/**
 *
 * @param _req
 * @param res
 * @returns All system products for the user to choose from
 */
const GetAllProducts = (_req: express.Request, res: express.Response) => {
  try {
    logger.debug('GetAllProducts started');

    const products = new ProductService().Products;

    return res.status(200).json(products);
  } catch (error: any) {
    const { errorMessage } = error;
    if (!errorMessage) {
      logger.error(error.message);
      return res.status(500).json(error.message);
    }
    logger.error(error.errorMessage);
    return res.status(error.status).json(error.errorMessage);
  }
};

export default GetAllProducts;
