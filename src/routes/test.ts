import {NextFunction, Request, Response} from "express"

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - Test - 测试用
 *    summary:
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: string
 */
const test = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({
    success: true,
    data: 'hello world'
  })
}

export default test
