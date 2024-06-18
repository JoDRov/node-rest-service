/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.app = void 0
const express_1 = __importDefault(require('express'))
const cors_1 = __importDefault(require('cors'))
const loggerMiddleware_1 = require('./dist/infraestructure/loggerMiddleware')
const noteController_1 = require('./dist/infraestructure/noteController')
exports.app = (0, express_1.default)()
exports.app.use(express_1.default.json())
exports.app.use((0, cors_1.default)())
exports.app.use(loggerMiddleware_1.logger)
const noteController = new noteController_1.NoteController()
exports.app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})
exports.app.get('/api/notes', noteController.getAllNotes)
exports.app.get('/api/notes/:id', noteController.getNoteById)
exports.app.delete('/api/notes/:id', noteController.deleteNote)
exports.app.post('/api/notes', noteController.createNote)
exports.app.put('/api/notes/:id/toggle', noteController.toggleNoteStatus)
const PORT = process.env.PORT || 3001
exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
