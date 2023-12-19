import http from 'node:http';
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === "GET" && url === "/users") {
        const users = database.select('users')
        return res
            .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {
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

    return res.writeHead(404).end()
})

server.listen(3333)