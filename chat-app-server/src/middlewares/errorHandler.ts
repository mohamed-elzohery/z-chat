import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errors/ErrorResponse';
import BadRequest from '../utils/errors/BadRequest';
import NotFound from '../utils/errors/NotFound';


const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    // Check if error is explicitly thrown by the developer
    if(err instanceof ErrorResponse){
        res.status(err.statusCode).json(err.message);
        return;
    }

    let error: ErrorResponse = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Server Error',
        name: err.name || 'server'
    };

    if(err.name && err.name === 'CastError' ){
        error = new NotFound(`${err.params.id} is not found`); 
        error.name = 'id';
    }

    if(err.name && err.name === 'ValidationError'){
        const firstError = err.errors[Object.keys(err.errors).at(-1)].properties;
        error = new BadRequest(firstError.message); 
        error.name = firstError.path;
    }

    if(err.code === 11000){
        const fieldName = err.message.slice(err.message.indexOf("index:" ) + 7 , err.message.indexOf("_1"));
        error = new BadRequest(`${fieldName} is duplicated`);
        error.name = fieldName;
    }
    res.status(error.statusCode).json({[error.name]: error.message});
}

export default ErrorHandler;