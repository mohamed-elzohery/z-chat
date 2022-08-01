import ErrorResponse from './ErrorResponse';

class NotFound extends ErrorResponse{
    constructor(message: string){
        super(404, message)
    }
}

export default NotFound;