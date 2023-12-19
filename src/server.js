import http from 'node:http';

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    if (method === "GET" && url === "/users") {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {
        const buffers = []
        for await (const chunk of req) {
            buffers.push(chunk)
        }
        try {
            const body = JSON.parse(
                Buffer.concat(buffers).toString()
            )
            users.push(body)
        } catch(e) {
            if (e instanceof Error) console.log(e)
            return res.writeHead(400).end('Body was empty')
        }
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)