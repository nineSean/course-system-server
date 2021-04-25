import {Request, Response, NextFunction} from "express"

export default function fail(_req: Request, _res: Response, next: NextFunction){
  const error = {
    success: false,
    message: '错误响应测试',
  }
  next(error)
}