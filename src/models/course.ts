import mongoose, {Document, Schema} from 'mongoose'

export interface ICourseDocument extends Document {
  order: number
  title: string
  url: string
  price: string
  category: string
  video: string
  poster: string
}

const CourseSchema: Schema<ICourseDocument> = new Schema({
  order: Number,
  title: String,
  url: String,
  price: String,
  category: String,
  video: String,
  poster: String,
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, result){
      result.id = result._id
      delete result._id
      delete result.__v
      return result
    }
  }
})

export const Course = mongoose.model<ICourseDocument>('course', CourseSchema)