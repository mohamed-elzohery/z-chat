import ErrorResponse from './ErrorResponse';

class BadRequest extends ErrorResponse{
    constructor(message: string){
        super(400, message)
    }
}

export default BadRequest;