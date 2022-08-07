import {Router} from 'express';
import { updateName, updatePhoto, updateStatus } from '../../controllers/user/updateUser';


const UserRouter = Router();

UserRouter.patch('/photo', updatePhoto)
          .patch('/name', updateName)
          .patch('/status', updateStatus);


export default UserRouter;
