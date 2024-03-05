import { Nota } from '../domain/nota'

export class NoteRepository {
    private notes: Nota[] = [
        {
            id: 1,
            content: 'Hola',
            completed: false,
        },
    ]

    getAllNotes(): Nota[] {
        return this.notes
    }

    getNoteById(id: number): Nota | undefined {
        return this.notes.find((note) => note.id === id)
    }

    deleteNote(id: number): void {
        this.notes = this.notes.filter((note) => note.id !== id)
    }

    createNote(content: string, completed: boolean): Nota {
        const newNote = new Nota(this.getNextId(), content, completed)
        this.notes.push(newNote)
        return newNote
    }

    toggleNoteStatus(id: number): Nota | undefined {
        const noteIndex = this.notes.findIndex((note) => note.id === id)

        if (noteIndex !== -1) {
            const updatedNote = { ...this.notes[noteIndex], completed: !this.notes[noteIndex].completed }
            this.notes[noteIndex] = updatedNote
            return updatedNote
        }

        return undefined
    }

    private getNextId(): number {
        const ids = this.notes.map((note) => note.id)
        return Math.max(...ids) + 1
    }
}
