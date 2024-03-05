export class Nota {
    id: number
    content: string
    completed: boolean

    constructor(id: number, content: string, completed: boolean) {
        this.id = id
        this.content = content
        this.completed = completed
    }
}