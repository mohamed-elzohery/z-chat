import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
    (async (req: Request, res: Response, next: NextFunction) => {
        try{
            await fn(req, res, next);
        }catch(err){
            next(err);
        }
    })

export default asyncHandler;