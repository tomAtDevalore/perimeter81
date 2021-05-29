import { Router } from 'express';
import {
  userAddToCartSchema,
  userBodySchema,
  userLoginSchema,
  userLogoutSchema,
  userUpdateSchema,
  validator,
} from './jsonValidator';

import {
  CreateNewUser,
  LoginUser,
  LogOut,
  UpdateUser,
  DeleteUser,
  AddItemsToCart,
} from '../controllers/userController';
import Auth from './auth';

const userRouter = Router();

userRouter.post('/createUser', validator.body(userBodySchema), CreateNewUser);
userRouter.post('/login', validator.body(userLoginSchema), LoginUser);
userRouter.post('/logout', Auth, validator.body(userLogoutSchema), LogOut);
userRouter.post('/updateUser', Auth, validator.body(userUpdateSchema), UpdateUser);
userRouter.post('/addItems', Auth, validator.body(userAddToCartSchema), AddItemsToCart);
userRouter.delete('/delete', Auth, validator.body(userLogoutSchema), DeleteUser);

export default userRouter;
