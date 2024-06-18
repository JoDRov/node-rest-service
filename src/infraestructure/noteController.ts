import { Request, Response, NextFunction } from 'express'
import { NoteRepository } from '../application/noteRepository'

export class NoteController {
    private noteRepository: NoteRepository

    constructor() {
        this.noteRepository = new NoteRepository()
    }

    getAllNotes = (request: Request, response: Response) => {
        response.json(this.noteRepository.getAllNotes())
    }

    getNoteById = (request: Request, response: Response, next: NextFunction) => {
        const id: number = Number(request.params.id)
        const note = this.noteRepository.getNoteById(id)

        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
            next()
        }
    }

    deleteNote = (request: Request, response: Response, next: NextFunction) => {
        const id: number = Number(request.params.id)
        this.noteRepository.deleteNote(id)
        response.status(204).json('Note deleted').end()
        next()
    }

    createNote = (request: Request, response: Response, next: NextFunction) => {
        const note = request.body

        if (!note || !note.content) {
            return response.status(400).json({
                error: 'note.content is missing',
            })
        }

        const newNote = this.noteRepository.createNote(note.content, note.completed)
        response.status(201).json(newNote)
        next()
    }

    toggleNoteStatus = (request: Request, response: Response, next: NextFunction) => {
        console.log(request.params)
        const id: number = Number(request.params.id)
        const updatedNote = this.noteRepository.toggleNoteStatus(id)

        if (updatedNote) {
            response.json(updatedNote)
        } else {
            response.status(404).json('Note not found').end()
            next()
        }
    }
}