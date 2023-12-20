import { randomUUID } from 'node:crypto'
import { Database } from './database/database.js';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res
                .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
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
    }
]