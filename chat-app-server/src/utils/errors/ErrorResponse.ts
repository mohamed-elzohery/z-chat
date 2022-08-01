class ErrorResponse extends Error{
    statusCode: number;
    message: string;
    
    public constructor(statusCode: number, message: string){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorResponse;