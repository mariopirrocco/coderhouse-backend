const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const knex = require('knex')



// SQLite config
const knexSqlite = knex({
  client: 'better-sqlite3',
  connection: {
    filename:'./db.sqlite'
  }
})

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
async function createTable() {
  const exists = await knexSqlite.schema.hasTable('messagesLog')
  if(!exists) {
    await knexSqlite.schema.createTable('messagesLog', (table) => {
      table.increments('id'),
      table.string('from'),
      table.string('text')
    })
  }
}
createTable()

io.on('connection', async (socket) => {
  // await createTable()

  const messages = await knexSqlite.from('messagesLog').select('from', 'text')
  
  socket.emit('messages', messages)

  socket.on('newMessage', async (msg) => {
    console.log(msg)
    await knexSqlite('messagesLog').insert({
      from: socket.id, text: msg
    })
    const messages = await knexSqlite.from('messagesLog').select('from', 'text')
    io.sockets.emit('messages', messages)
  })
})