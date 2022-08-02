import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import ErrorResponse from '../utils/errors/ErrorResponse';
import BadRequest from '../utils/errors/BadRequest';
import NotFound from '../utils/errors/NotFound';


const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Check if error is explicitly thrown by the developer
    console.log(err);
    if(err instanceof ErrorResponse){
        res.status(err.statusCode).json(err.message);
        return;
    }

    let error: ErrorResponse = {
        statusCode: 500,
        message: 'Server Error',
        name: 'server'
    };

    if(err.name && err.name === 'CastError' ){
        error = new NotFound(`${err.params.id} is not found`); 
    }

    if(err.name && err.name === 'ValidationError'){
        error = new BadRequest(err.errors[Object.keys(err.errors).at(-1)].properties.message); 
    }

    if(err.code === 11000){
        const fieldName = err.message.slice(err.message.indexOf("index:" ) + 7 , err.message.indexOf("_1"));
        error = new BadRequest(`${fieldName} is duplicated`);
    }

    res.status(error.statusCode).json(error.message);
}

export default ErrorHandler;