// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import express, { Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import { logger } from './loggerMiddleware'
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

const PORT = process.env.PORT || 3001
let notes = [
    {
        id: 1,
        content: 'Mi cumpleaños ',
        date: '19:00-26/4/2024',
        important: false
    },
    {
        id: 2,
        content: 'Tengo que estudiar ',
        date: '19:00-20/8/2023',
        important: true
    },
    {
        id: 3,
        content: 'Ir en skate ',
        date: '10:00-25/9/2023',
        important: false
    }
]

app.get('/', (request, response) => {
    // express detecta que el contenido es HTML y lo insertara como tal en la web
    response.send('<h1>Hello Worlds</h1>')
})
// direccion localhost:3001/api/notes
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response, next) => {
    // coge la direccion que le añadimos despues de notes: /api/notes/1 guarda 1 en const id
    const id: number = Number(request.params.id)
    // si hay una nota con id uno la guarda en const note
    const note = notes.find((note) => note.id === id)

    if (note) {
        // si encuentra la id de la nota la muestra
        response.json(note)
    } else {
        // Si no la encuentra muestra un error de que no se ha encoontrado la pagina web
        // response.status(404).end()
        // I dissabled the line above so it can go to the error app.use below
        next()
    }
})
// DELETE----------------------------------------DELETE----------------------------------------DELETE
app.delete('/api/notes/:id', (request, response) => {
    const id: number = Number(request.params.id)
    notes = notes.filter((note) => note.id !== id)
    response.status(204).json('Post deleted').end()
})
// POST------------------------------------------POST------------------------------------------POST
app.post('/api/notes', (request, response) => {
    const note = request.body

    // If there's no note or note.content throw error
    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map((note) => note.id)
    const maxId: number = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important:
            typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(newNote)
    response.status(201).json(newNote)
})
// ERROR-----------------------------------------ERROR-----------------------------------------ERROR
app.use((request: Request, response: Response) => {
    response.status(404).json({
        error: 'Not found'
    })
})
// LISTEN----------------------------------------LISTEN----------------------------------------LISTEN

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
