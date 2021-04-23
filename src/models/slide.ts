import mongoose, {Document, Schema} from 'mongoose'

export interface ISlideDocument extends Document{
  url: string
}

const SlideSchema: Schema<ISlideDocument> = new Schema({
  url: String,
}, {
  timestamps: true
})

export const Slide = mongoose.model<ISlideDocument>('slide', SlideSchema)