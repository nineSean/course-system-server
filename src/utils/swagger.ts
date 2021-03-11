import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {Express, NextFunction, Response, Request} from 'express'
import path from 'path'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Course Platform API",
      description: "Course Platform API Information",
      contact: {
        name: "nineSean"
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Swagger API Auto Mocking'
      },
    ],
    tags: [
      {
        name: 'user',
        description: '用户操作'
      }
    ],
  },
  apis: [path.resolve(__dirname, "../index.ts"), path.resolve(__dirname, "../routes/*.ts")]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
export default (app: Express) => {
  if (process.env.NODE_ENV === 'dev') {
    app.get('/docs.json', (_req: Request, res: Response, _next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerDocs)
    })
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }
}

