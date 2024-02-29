'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.logger = void 0
const logger = (request, response, next) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log('-----------')
    next()
}
exports.logger = logger
