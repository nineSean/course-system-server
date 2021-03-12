import {NextFunction, Request, Response} from "express"
import {IUserDocument, User} from "../models"
import {validateRegisterInput} from '../utils/validate'
import HttpException from "../exceptions/HttpException"
import {UNPROCESSABLE_ENTITY} from 'http-status-codes'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {username, password, confirmPassword, email} = req.body
    const {valid, errors} = validateRegisterInput(username, password, confirmPassword, email)
    if (!valid) throw new HttpException(UNPROCESSABLE_ENTITY, '参数校验失败', errors)

    const user: IUserDocument = new User({username, password, confirmPassword, email})
    const existedUser: IUserDocument | null = await User.findOne({username: user.username})
    if (existedUser) throw new HttpException(UNPROCESSABLE_ENTITY, '未处理实体')

    await user.save()
    res.send({
      success: true,
      data: user
    })
  } catch (err) {
    next(err)
  }
}
