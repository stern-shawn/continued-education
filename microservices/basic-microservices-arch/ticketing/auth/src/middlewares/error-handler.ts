import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something went wrong', err);
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));

    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
