import {Request, Response} from 'express'
import {Course, ICourseDocument} from '../models'
import {FilterQuery} from "mongoose"

export const getCourses = async (req: Request, res: Response) => {
  const {category} = req.query
  let offset: any = req.query.offset
  let limit: any = req.query.limit
  const query: FilterQuery<ICourseDocument> = {}
  if (category && category !== 'all') query.category = category as string
  offset = isNaN(offset) ? 0 : parseInt(offset)
  limit = isNaN(offset) ? 0 : parseInt(limit)
  const total = await Course.countDocuments(query)
  const courses = await Course.find(query).sort({order: 1}).skip(offset).limit(limit)
  const list = courses.map(course => course.toJSON())
  res.send({
    success: true,
    data: {
      list,
      hasMore: total > offset + limit
    }
  })
}

export const getCourse = async (req: Request, res: Response) => {
  const id = req.params.id
  const course = await Course.findById({_id: id})
  res.send({
    success: true,
    data: course
  })
}