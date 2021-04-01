import mongoose from "mongoose"

export default async function(){
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/course-platform'
  await mongoose.connect(MONGODB_URL)
}
