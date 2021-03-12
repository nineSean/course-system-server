import express from 'express'
import * as userController from '../controllers/user'

const router = express.Router()

/**
 * @swagger
 * /session:
 *  post:
 *    tags:
 *      - Session
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
 *              - confirmPassword
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
 *      '201':
 *        description: user created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 *      '400':
 *        description: 'invalid input'
 *      '409':
 *        description: 'conflict'
 *
 */
router.post('/', userController.register)

export default router
