// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import logger from "../utils/logger";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
