import {NextFunction, Request, Response} from "express"
import {IUserDocument, User} from "../models"
import {validateRegisterInput} from '../utils/validate'
import HttpException from "../exceptions/HttpException"
import {UNPROCESSABLE_ENTITY, UNAUTHORIZED} from 'http-status-codes'
import {stat, rm} from 'fs/promises'
import path from "path"

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {username, password, confirmPassword, email} = req.body
    const {valid, errors} = validateRegisterInput(username, password, confirmPassword, email)
    if (!valid) throw new HttpException(UNPROCESSABLE_ENTITY, '参数校验失败', errors)
    const user: IUserDocument = new User({username, password, confirmPassword, email})
    const existedUser: IUserDocument | null = await User.findOne({username: user.username})
    if (existedUser) throw new HttpException(UNPROCESSABLE_ENTITY, '用户已存在')
    await user.save()
    res.send({
      success: true,
      data: user
    })
  } catch (err) {
    next(err)
  }
}
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  const user = await User.login(username, password)
  try {
    if (!user) throw new HttpException(UNAUTHORIZED, '登录失败')
    const token = user.generateToken()
    res.json({
      success: true,
      data: {
        token
      }
    })
  } catch (error) {
    next(error)
  }
}
export const uploadAvatar = async (req: Request, res: Response, _next: NextFunction) => {
  const {userId} = req.body
  const user = await User.findOne({_id: userId})
  if (user!.avatar) {
    const filename = user!.avatar.split('/').reverse()[0]
    const filePath = path.join(__dirname, '../public/upload/') + filename
    const stats = await stat(filePath).catch(_error => undefined)
    stats && await rm(filePath)
  }
  const domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`
  const avatar = `${domain}/upload/${req.file.filename}`
  await User.updateOne({_id: userId}, {avatar})
  res.send({
    success: true,
    data: avatar
  })
}