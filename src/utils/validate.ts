import validator from "validator"
import {IUserDocument} from "../models"

export interface RegisterInput extends Partial<IUserDocument> {
  confirmPassword?: string
}

export interface ValidateRegisterInputResult {
  valid: boolean,
  errors: RegisterInput
}

export const validateRegisterInput = (username: string, password: string, confirmPassword: string, email?: string): ValidateRegisterInputResult => {
  const errors: RegisterInput = {} as RegisterInput
  if (username === undefined || validator.isEmpty(username)) {
    errors.username = '用户名不能为空'
  }
  if (password === undefined || validator.isEmpty(password)) {
    errors.password = '密码不能不为空'
  }
  if (confirmPassword === undefined || validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = '确认密码不能为空'
  }
  if (!validator.equals(password, confirmPassword)) {
    (errors.confirmPassword = '确认密码与密码不相等')
  }
  if (email !== undefined && !validator.isEmail(email)) {
    errors.email = '邮箱格式不正确'
  }

  return {
    errors,
    valid: Object.keys(errors).every(item => item.length === 0)
  }
}