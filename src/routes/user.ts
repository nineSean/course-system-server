//@ts-ignore
import express, {Request, Response, Express} from 'express'
import {register, uploadAvatar} from "../controllers/user"
import auth from "../middlewares/auth"
import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public', 'upload'),
  filename(_req: Request, file: Express.Multer.File, cb){
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage})

const router = express.Router()

/**
 * @swagger
 * /user:
 *  post:
 *    tags:
 *      - User
 *    summary: 用户注册
 *    description:
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                example: xiaoming
 *              password:
 *                type: string
 *                example: 123456
 *              confirmPassword:
 *                type: string
 *                example: 123456
 *
 *    responses:
 *      '200':
 *        description: login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 *
 */
router.post('/', register)
router.get('/', auth, (_req, res: Response) => {
  res.json({
    success: true,
    data: res.locals.user
  })
})
router.post('/avatar', upload.single('avatar'), uploadAvatar)

export default router
