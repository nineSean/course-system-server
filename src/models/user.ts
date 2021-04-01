import mongoose, {Document, HookNextFunction, Model, Schema,} from 'mongoose'
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {IUserPayload} from '../typings/jwt'

export interface IUserDocument extends Document {
  username: string,
  password: string,
  avatar: string,
  email?: string,
  generateToken: () => string
}

const UserSchema: Schema<IUserDocument> = new Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minLength: [6, '最小长度不小于6位'],
    maxLength: [12, '最小长度不小于12位'],
  },
  password: String,
  avatar: String,
  email: {
    type: String,
    validate: {
      validator: validator.isEmail
    },
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, result){
      result.id = result._id
      delete result._id
      delete result.password
      delete result.createdAt
      delete result.updatedAt
      delete result.__v
      return result
    }
  }
})
UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})
UserSchema.static('login', async function (this:any, username: string, password: string): Promise<IUserDocument | null> {
  const user = await this.model('User').findOne({username})
  if (!user) return null
  const Matched = bcrypt.compare(password, user.password)
  if (Matched) return user
  return null
})
UserSchema.methods.generateToken = function (this: IUserDocument): string {
  const payload: IUserPayload = {id: this.id}
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'sean', {expiresIn: '7 days'})
}
interface IUserModel<T extends Document> extends Model<T>{
  login: (username: string, password: string) => IUserDocument | null
}
export const User: IUserModel<IUserDocument> = mongoose.model<IUserDocument, IUserModel<IUserDocument>>('User', UserSchema)

