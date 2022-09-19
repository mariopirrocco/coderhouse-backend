import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { config } from './utils/config.js'

const knexSqlite = config

const app = express()

app.use(express.json())
app.use(express.static('./public'))

const httpServer = new HttpServer(app)
const PORT = 8081

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const io = new IOServer(httpServer)

// Creating tables
async function createTable(tableName) {
  const exists = await knexSqlite.schema.hasTable(tableName)
  if(!exists) {
    await knexSqlite.schema.createTable(tableName, (table) => {
      table.increments('id').primary,
      table.string('from').notNullable,
      table.string('text').notNullable
    })
  }
}
createTable('mensajeria')

io.on('connection', async (socket) => {
  // await createTable()

  const messages = await knexSqlite.from('mensajeria').select('from', 'text')
  
  socket.emit('messages', messages)

  socket.on('newMessage', async (msg) => {
    await knexSqlite('mensajeria').insert({
      from: socket.id, text: msg
    })
    const messages = await knexSqlite.from('mensajeria').select('from', 'text')
    io.sockets.emit('messages', messages)
  })
})