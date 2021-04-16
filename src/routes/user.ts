import express, {Response} from 'express'
import {register} from "../controllers/user"
import auth from "../middlewares/auth"

const router = express.Router()

/**
 * @swagger
 * /session:
 *  post:
 *    tags:
 *      - User
 *    summary: 用户登陆
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

export default router
