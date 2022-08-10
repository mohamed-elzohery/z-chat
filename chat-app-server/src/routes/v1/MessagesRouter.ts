// Temporory
import {Router} from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Message from '../../models/Message';

const MessagesRouter = Router();

MessagesRouter.post('/', asyncHandler(async (req, res, next) => {
    const message = await Message.create(req.body);
    res.json({message});
}));

MessagesRouter.get('/', asyncHandler(async (req, res, next) => {
    const messages = await Message.find();
    res.json({messages});
}));


export default MessagesRouter;