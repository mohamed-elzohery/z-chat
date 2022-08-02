import asyncHandler from "../../middlewares/asyncHandler";
import User from "../../models/User";
import { AuthenticatedRequest } from "src/middlewares/authGuard";


const updateUser = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    const id = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    res.json({
        message: 'user is updated successfully',
        data: updatedUser,
        success: true,
    });
});

export default updateUser;
