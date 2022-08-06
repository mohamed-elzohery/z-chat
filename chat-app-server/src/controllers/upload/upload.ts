import AWS from 'aws-sdk';
import { AuthenticatedRequest } from '../../middlewares/authGuard';
import {v1 as getRandomName} from 'uuid';
import asyncHandler from '../../middlewares/asyncHandler';



console.log(process.env.accessKeyId + "    -----     " + process.env.secretAccessKey + "----" + process.env.PORT);
const upload = asyncHandler(async (req: AuthenticatedRequest, res, next) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: "us-east-1"
    });

    const Key = `${req.user._id}/${getRandomName()}.png`;
    console.log( process.env.secretAccessKey);
    const url = await s3.getSignedUrlPromise("putObject", {
        Bucket: "zchat-uploads",
        ContentType: "image/png",
        Key,
        Expires: 300,
    }).catch(err=> console.log(err));

    res.json({Key, url});
});

export default upload;