const PORT = 3003
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(PORT, () => {
  console.log('JSON Server is running on port: ', PORT)
})

// Estando en la carpeta que contiene server.js
// $ node server.js