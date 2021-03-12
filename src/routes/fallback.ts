import {NextFunction, Request, Response} from "express"
import HttpException from "../exceptions/HttpException"

const fallback = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new HttpException(404, '未匹配该路由')
  next(error)
}

export default fallback

