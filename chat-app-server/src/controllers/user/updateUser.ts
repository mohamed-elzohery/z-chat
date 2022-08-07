import BadRequest from "../../utils/errors/BadRequest";
import asyncHandler from "../../middlewares/asyncHandler";
import User from "../../models/User";
import { AuthenticatedRequest } from "../../middlewares/authGuard";


export const updatePhoto = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    console.log(req.body);
    if(!req.body.photoKey) return next(new BadRequest('must contain a photo'));
    const {photoKey} = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {photo: photoKey}, {new: true});
    res.json({photo: updatedUser.photo});
});


export const updateName = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    if(!req.body.name) return next(new BadRequest('must contain a name'));
    const {name} = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {name}, {new: true, runValidators: true});
    res.json({name: updatedUser.name});
});

export const updateStatus = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    if(!req.body.status) return next(new BadRequest('must contain a status'));
    const {status} = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {status}, {new: true, runValidators: true});
    res.json({status: updatedUser.status});
});


