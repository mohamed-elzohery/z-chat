
import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import asyncHandler from '../../middlewares/asyncHandler';
import User from '../../models/User';


const getCurrentUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token_uid'];
    if(!token){
        res.send({success: true, data: {currentUser: null}, message: 'user is not registered'});
        return;
    }
    const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;

    const user = await User.findById(decodedToken.id);
    if(!user){
        res.send({success: true, data: {currentUser: null}, message: 'token is not valid.'});
        return;
    }
     res.json({success: true, data: {currentUser: user}, message: 'valid token'})
});

export default getCurrentUser;