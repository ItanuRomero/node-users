import { randomUUID } from 'node:crypto'
import { Database } from './database/database.js';
import { parseRoutePath } from './services/parse-route-path.js';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: parseRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')
            return res
                .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: parseRoutePath('/users'),
        handler: (req, res) => {
            if (req.body) {
                const { name, email } = req.body
                database.insert('users', {
                    id: randomUUID(),
                    name,
                    email
                })
                return res.writeHead(201).end()
            }
            return res.writeHead(400).end('Request body was empty')
        }
    },
    {
        method: 'DELETE',
        path: parseRoutePath('/users/:id'),
        handler: (req, res) => {
            const id = req.params.id
            if (id) {
                try {
                    database.delete('users', id)
                    return res.writeHead(204).end()
                } catch {
                    return res.writeHead(404).end('User does not exist || already removed')
                }
            }
            return res.writeHead(400).end('Id not specified')
        }
    }
]