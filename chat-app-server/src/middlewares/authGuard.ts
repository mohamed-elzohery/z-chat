
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import asyncHandler from './asyncHandler';
import USER from '../models/User';
import Unauthorized from '../utils/errors/Unauthorized';
import BadRequest from '../utils/errors/BadRequest';
import { UserI } from '../models/User';

export interface AuthenticatedRequest extends Request {
    user: UserI;
}

const authGuard = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  let token = req.cookies['token_uid'] || req.body.token;
  console.log(token);
  if (!token) return next(new Unauthorized('Unauthorized user access'));

  let decodedToken;

  try{
     decodedToken = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
    }catch(err){
        next(new BadRequest('invalid token'));
        return;
    }

  const user = await USER.findById(decodedToken.id);

  if (user === null) {
    return next(new Unauthorized('Unauthorized user access'));
  }
  req.user = user;
  next();
});

export default authGuard;