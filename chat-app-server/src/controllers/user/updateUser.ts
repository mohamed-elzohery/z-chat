import asyncHandler from "../../middlewares/asyncHandler";
import User from "../../models/User";
import { AuthenticatedRequest } from "../../middlewares/authGuard";


const updateUser = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    const id = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    res.json({
        message: 'user is updated successfully',
        data: updatedUser,
        success: true,
    });
});

export default updateUser;
