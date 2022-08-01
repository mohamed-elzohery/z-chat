import asyncHandler from '../../middlewares/asyncHandler';
import BadRequest from '../../utils/errors/BadRequest';
import User from '../../models/User';

const login = asyncHandler(async (req, res, next) => {
    const {email, password: enteredPassword} = req.body;
    if(!(email && enteredPassword)){
        return next(new BadRequest('Please enter email and password.'));
    }
    const user = await User.findOne({email});
    if(!(user !== null && await user.isPasswordMatched(enteredPassword))){
        return next(new BadRequest('Invalid email or password.'))
    }
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE),
        path: '/'
    });
    res.json({success: true, data: user, token, message: 'User is logged in successfully.'});
});

export default login;