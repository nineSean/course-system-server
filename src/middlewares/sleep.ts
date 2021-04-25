import {Request, Response, NextFunction} from "express"
import {sleep as _sleep} from '../utils'

export default function sleep(ms = 1000) {
  return async function (_req: Request, _res: Response, next: NextFunction){
    await _sleep(ms)
    next()
  }
}
