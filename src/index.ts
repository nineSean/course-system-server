import express, {Express, Request, Response} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'dotenv/config'
import path from 'path'
import errorMiddleware from "./middlewares/errorMiddleware"
import HttpException from "./exceptions/HttpException"

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (_req: Request, res: Response, _next) => {
  console.log('enter')
  res.json({
    success: true,
    data: 'hello world'
  })
})
app.use((_req: Request, _res: Response, next) => {
  const error = new HttpException(404, '未匹配该路由')
  next(error)
})
app.use(errorMiddleware)

void async function(){
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/course-platform'
  await mongoose.connect(MONGODB_URL)
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
}()