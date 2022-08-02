import ErrorResponse from './ErrorResponse';

class Unauthorized extends ErrorResponse{
    constructor(message: string){
        super(401, message)
    }
}

export default Unauthorized;