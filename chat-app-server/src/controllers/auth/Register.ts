import asyncHandler from '../../middlewares/asyncHandler';
import User from '../../models/User';

const register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE),
        path: '/',
    });
    res.status(201).json({success: true, data: user, token, message: 'User created successfully.'});
});

export default register;