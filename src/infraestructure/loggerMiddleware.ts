import { NextFunction, Request, Response } from 'express'

export const logger = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log('-----------')
    next()
}
