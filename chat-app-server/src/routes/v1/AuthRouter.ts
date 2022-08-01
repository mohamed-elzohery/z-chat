import {Router} from 'express';
import getCurrentUser from '../../controllers/auth/getCurrentUser';
import login from '../../controllers/auth/Login';
import logout from '../../controllers/auth/Logout';
import register from '../../controllers/auth/Register';

const AuthRouter = Router();

AuthRouter.get('/current-user', getCurrentUser);
AuthRouter.post('/logout', logout);
AuthRouter.post('/login', login);
AuthRouter.post('/register', register);

export default AuthRouter;

