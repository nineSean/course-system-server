import express, {Express} from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'dotenv/config'
import swagger from './utils/swagger'
import test from "./routes/test"
import session from './routes/session'
import fallback from './routes/fallback'
import errorMiddleware from "./middlewares/errorMiddleware"

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
swagger(app)

app.get('/', test)
app.use('/session', session)
app.use(fallback)
app.use(errorMiddleware)

void async function(){
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/course-platform'
  await mongoose.connect(MONGODB_URL)
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
  })
}()