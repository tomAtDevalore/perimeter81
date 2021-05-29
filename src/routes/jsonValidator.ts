import * as Joi from 'joi';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {
  IUserResource,
  IUserLoginResource,
  IUserLogoutResource,
  IUserUpdateResource,
  IUserAddToCartResource,
} from '../interfaces/IUser';

const validator = createValidator();

const userBodySchema = Joi.object({
  email: Joi.string().required(),
  streetAddress: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userLogoutSchema = Joi.object({
  extractedId: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  streetAddress: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  extractedId: Joi.string().required(),
});

const userAddToCartSchema = Joi.object({
  items: Joi.array().required(),
  extractedId: Joi.string().required(),
});

interface UserBodyRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IUserResource;
}

interface UserLoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IUserLoginResource;
}

interface UserLogoutRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IUserLogoutResource;
}

interface UserUpdateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IUserUpdateResource;
}

interface UserAddToCartRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IUserAddToCartResource;
}

export {
  validator,
  UserBodyRequestSchema,
  UserLoginRequestSchema,
  UserLogoutRequestSchema,
  userLogoutSchema,
  userUpdateSchema,
  UserUpdateRequestSchema,
  userBodySchema,
  userLoginSchema,
  UserAddToCartRequestSchema,
  userAddToCartSchema,
};
