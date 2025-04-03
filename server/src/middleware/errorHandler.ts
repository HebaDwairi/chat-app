import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

const errorHandler = (err: any, request: Request, response: Response, next: NextFunction) => {

  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong',
    code: err.code,
  };

  if (err instanceof PrismaClientKnownRequestError) {
    error.statusCode = 400;
    error.message = 'Database error occurred';
    
    switch (err.code) {
      case 'P2002':
        error.message = 'Username must be unique';
        break;
      case 'P2025':
        error.statusCode = 404;
        error.message = 'Record not found';
        break;
      case 'P2003':
        error.message = 'Foreign key constraint failed';
        break;
      case 'P2016':
        error.message = 'Invalid data format';
        break;
    }
  }

  if (err instanceof PrismaClientValidationError) {
    error.statusCode = 400;
    error.message = 'Invalid data format in database query';
  }

  if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid token';
  }


  response.status(error.statusCode).json({
    error: error.message
  });
}

export default errorHandler;