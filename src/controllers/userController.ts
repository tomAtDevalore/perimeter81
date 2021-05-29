import express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import logger from '../log/logger';
import {
  UserAddToCartRequestSchema,
  UserBodyRequestSchema,
  UserLoginRequestSchema,
  UserLogoutRequestSchema,
  UserUpdateRequestSchema,
} from '../routes/jsonValidator';
import UserService from '../services/userService';

/**
 * Create a new user and store it on the current process
 * @param req Should pass validation
 * @param res
 * @returns
 */
const CreateNewUser = async (req: ValidatedRequest<UserBodyRequestSchema>, res: express.Response) => {
  try {
    logger.debug('CreateNewUser started');

    const user = await new UserService().CreateUser(req.body);

    return res.status(200).json(user);
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

/**
 * Login a register user, dispatching new token for the user
 * @param req Should pass validation
 * @param res
 * @returns
 */
const LoginUser = async (req: ValidatedRequest<UserLoginRequestSchema>, res: express.Response) => {
  try {
    logger.debug('LoginUser started');

    const user = await new UserService().LoginUser(req.body);

    return res.status(200).json(user);
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

/**
 * Logout user, deleting the token from the user object
 * @param req Should pass validation
 * @param res
 * @returns
 */
const LogOut = async (req: ValidatedRequest<UserLogoutRequestSchema>, res: express.Response) => {
  try {
    logger.debug('LogOut started');

    const isSuccess = new UserService().LogoutUser(req.body.extractedId);

    return res.status(200).json(isSuccess);
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

/**
 * Update the user based on selected fields
 * @param req Should pass validation
 * @param res
 * @returns
 */
const UpdateUser = async (req: ValidatedRequest<UserUpdateRequestSchema>, res: express.Response) => {
  try {
    logger.debug('UpdateUser started');

    const isSuccess = new UserService().UpdateUser(req.body);

    return res.status(200).json(isSuccess);
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

/**
 * Delete a user from the system, depends on user authentication for id extraction
 * @param req Should pass validation
 * @param res
 * @returns
 */
const DeleteUser = (req: any, res: express.Response) => {
  try {
    logger.debug('DeleteUser started');

    const isSuccess = new UserService().DeleteUser(req.body.extractedId);

    return res.status(200).json(isSuccess);
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

/**
 * Adds new items to the current user shopping cart
 * @param req Should pass validation
 * @param res
 * @returns
 */
const AddItemsToCart = (req: ValidatedRequest<UserAddToCartRequestSchema>, res: express.Response) => {
  try {
    logger.debug('AddItemsToCart started');

    new UserService().AddItemsToCart(req.body.items, req.body.extractedId);

    return res.status(200).json(true);
  } catch (error) {
    const { errorMessage } = error;
    if (!errorMessage) {
      logger.error(error.message);
      return res.status(500).json(error.message);
    }
    logger.error(error.errorMessage);
    return res.status(error.status).json(error.errorMessage);
  }
};

export { CreateNewUser, LoginUser, LogOut, UpdateUser, DeleteUser, AddItemsToCart };
