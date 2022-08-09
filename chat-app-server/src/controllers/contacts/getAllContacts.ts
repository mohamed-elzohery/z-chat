import BadRequest from "../../utils/errors/BadRequest";
import asyncHandler from "../../middlewares/asyncHandler";
import User from "../../models/User";
import { AuthenticatedRequest } from "../../middlewares/authGuard";

const getAllContacts = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    const allContacts = await User.find({_id: {$ne: req.user._id}});
    res.json({contacts: allContacts});
});


export default getAllContacts;