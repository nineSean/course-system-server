import express, {Express} from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'dotenv/config'
import swagger from './utils/swagger'
import test from "./routes/test"
import session from './routes/session'
import user from './routes/user'
import fallback from './routes/fallback'
import errorMiddleware from "./middlewares/errorMiddleware"
import connect from "./utils/connect"

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
app.use('/user', user)
app.use(fallback)
app.use(errorMiddleware)

const port = process.env.PORT || 8000
void async function(){
  await connect()
  app.listen(port, () => {
    console.log(`Running on ${port}`)
  })
}()
