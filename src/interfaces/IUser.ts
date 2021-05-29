import { IProductResource } from './IProduct';

interface IUserResource {
  streetAddress: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IUser {
  id: string;
  streetAddress: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token?: string;
  cartItems?: IProductResource[];
}

interface IUserLoginResource {
  email: string;
  password: string;
}

interface IUserLogoutResource {
  extractedId: string;
}

interface IUserUpdateResource {
  streetAddress: string;
  firstName: string;
  lastName: string;
  extractedId: string;
}

interface IUserAddToCartResource {
  items: Array<IProductResource>;
  extractedId: string;
}

export { IUserLoginResource, IUserUpdateResource, IUser, IUserResource, IUserLogoutResource, IUserAddToCartResource };
