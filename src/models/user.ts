import mongoose, {Schema, Model, Document, HookNextFunction,} from 'mongoose'
import validator from "validator"
import bcrypt from 'bcryptjs'

export interface IUserDocument extends Document {
  username: string,
  password: string,
  avatar: string,
  email?: string
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
  timestamps: true
})
UserSchema.pre<IUserDocument>('save', async function(next: HookNextFunction){
  if (!this.isModified('password')) return next()
  try{
    this.password = await bcrypt.hash(this.password, 10)
    next()
  }catch(err){
    next(err)
  }
})
export const User: Model<IUserDocument> = mongoose.model('User', UserSchema)

