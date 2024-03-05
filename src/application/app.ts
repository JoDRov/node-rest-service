import express, { Request, Response } from 'express'
import cors from 'cors'
import { logger } from './loggerMiddleware'
import { NoteController } from './noteController'

export const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

const noteController = new NoteController()

app.get('/', (request: Request, response: Response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', noteController.getAllNotes)
app.get('/api/notes/:id', noteController.getNoteById)
app.delete('/api/notes/:id', noteController.deleteNote)
app.post('/api/notes', noteController.createNote)
app.put('/api/notes/:id/toggle', noteController.toggleNoteStatus)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})