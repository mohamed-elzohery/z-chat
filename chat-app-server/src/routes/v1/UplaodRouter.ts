import {Router} from 'express';
import upload from '../../controllers/upload/upload';


const UploadRouter = Router();

UploadRouter.get('/', upload);


export default UploadRouter;