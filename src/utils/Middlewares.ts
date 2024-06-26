/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import logger from "./loggers";
import CustomError from "../classes/CustomError";
import { ErrorMessageResponse } from "../interfaces/responses";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  logger.debug(error.stack);
  res.status(error.status || 500);
  const errorResponse = {
    message: error.message,
  } as ErrorMessageResponse;
  res.json(errorResponse);
};

export { notFound, errorHandler };
