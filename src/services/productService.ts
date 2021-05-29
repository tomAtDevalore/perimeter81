import { IProduct } from '../interfaces/IProduct';

export default class ProductService {
  /**
   * Array that hold all the system products
   */
  private products: IProduct[] = [
    { productName: 'Margarita', productPrice: 15 },
    { productName: 'New York', productPrice: 17 },
    { productName: 'Tel Aviv', productPrice: 14 },
  ];

  /**
   * Get all products for the user to choose from
   */
  public get Products(): IProduct[] {
    return this.products;
  }
}
