import {Request, Response} from 'express'
import {Slide, ISlideDocument} from '../models'

export const slide = async (_req: Request, res: Response) => {
  const slides: ISlideDocument[] = await Slide.find()
  res.send({
    success: true,
    data: slides
  })
}