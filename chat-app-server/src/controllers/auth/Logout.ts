import { Request, Response, NextFunction } from "express";

const logout = (req: Request, res: Response, next: NextFunction ) => {
    res.clearCookie('token_uid');
    res.json({success: true, message: 'User is logged out.'});
}

export default logout;