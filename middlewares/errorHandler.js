

/**
 * Error handler for Error
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const errorHandler = (error, req, res, next) => {

    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'Unknown errors';

    return res.status(errorStatus).json({
        message: errorMessage,
        status: errorStatus,
        stack: error.stack
    });

}

export default errorHandler;