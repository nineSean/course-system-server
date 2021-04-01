import {Request, Response, NextFunction} from 'express'
import HttpException from "../exceptions/HttpException"
import {UNAUTHORIZED} from "http-status-codes"
import jwt from "jsonwebtoken"
import {IUserPayload} from "../typings/jwt"
import {User} from "../models"

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization
    let token = authorization ? authorization.split(' ')[1] : undefined
    if (!token) throw new HttpException(UNAUTHORIZED, 'token 未提供')
    let id
    try {
      const payload : IUserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'sean') as IUserPayload
      id = payload.id
    } catch (error) {
      next(new HttpException(UNAUTHORIZED, 'token 不合法'))
    }
    const user = await User.findById(id)
    if (!user) throw new HttpException(UNAUTHORIZED, '用户不存在')
    res.locals.user = user.toJSON()
    next()
  } catch (error) {
    next(error)
  }
}