import {Request, Response, NextFunction} from 'express'
import HttpException from "../exceptions/HttpException"
import {INTERNAL_SERVER_ERROR} from 'http-status-codes'

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || INTERNAL_SERVER_ERROR).send({
    success: false,
    message: error.message,
    error: error.errors
  })
}
export default errorMiddleware