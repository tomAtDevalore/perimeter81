import express from 'express';
import { verify } from 'jsonwebtoken';
import InvalidTokenError from '../utils/invalidTokenError';
/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * Authenticate the user token on certain routes
 *
 * @param req
 * @param res
 * @param next
 */
const Auth = (req: express.Request, res: express.Response, next: any) => {
  try {
    // Extract token
    const token = req.header('Authorization')!.replace('Bearer ', '');

    // Decoded
    const decoded: any = verify(token, process.env.jWT_SECRET ?? '');
    if (!decoded) {
      throw new InvalidTokenError();
    }

    req.body.extractedId = decoded._id;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default Auth;
