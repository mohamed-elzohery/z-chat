import s3 from '../../aws/S3';
import { AuthenticatedRequest } from '../../middlewares/authGuard';
import {v1 as getRandomName} from 'uuid';
import asyncHandler from '../../middlewares/asyncHandler';



const upload = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    const Key = `${req.user._id}/${getRandomName()}.png`;
    const url = await s3.getSignedUrlPromise("putObject", {
        Bucket: process.env.S3BucketName,
        ContentType: "image/png",
        Key,
        Expires: 300,
    });

    res.json({Key, url});
});



export default upload;