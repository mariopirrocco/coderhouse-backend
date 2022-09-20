/*-------- Modules --------*/
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { ContainerMySQL } from './container/containerMySQL.js'
import { ContainerSQLlite } from './container/containerSQLlite.js'
import { fileURLToPath } from "url"
import { engine } from 'express-handlebars'
import express from 'express'
import path, { dirname } from 'path' 


/*-------- API setup --------*/
const recordsApi = new ContainerMySQL('records')
const messagesApi = new ContainerSQLlite('messages')


/*-------- Middleware --------*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))


/*-------- Server --------*/
const httpServer = new HttpServer(app)
const PORT = 8080
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

/*-------- Websockets --------*/
const io = new IOServer(httpServer)
io.on('connection', async (socket) => {  
  
  // Record handling  
  const catalogue = await recordsApi.listAll()  
  socket.emit('catalogue', catalogue)

  socket.on('newRecord', async (record) => {
    await recordsApi.insert(record)
    const catalogue = await recordsApi.listAll()  
    io.emit('catalogue', catalogue)
  })
  
  // Messages handling  
  const messages = await messagesApi.listAll()  
  socket.emit('messages', messages)

  socket.on('newMessage', async (msg) => {
    console.log(msg)
    await messagesApi.insert(msg)    
    const messages = await messagesApi.listAll() 
    io.sockets.emit('messages', messages)
  })

})



// /*-------- Connections --------*/
// io.on('connection', async(socket) => {
//   console.log(`User id: ${socket.id} has joined the conversation`)
//   console.log(`There are ${messages.length} messages in chat`)

//   // Send all records
//   socket.emit('server:sendRecords', data)

//   socket.on('client:sendRecord', (recordObject) => {
//     data.push(recordObject)
//     console.log(data)
//     // Send records to all users
//     io.emit('server:sendRecords', data)
//   })

//   // Send chat messages
//   socket.emit('server:sendMessages', messages)

//   socket.on('client:sendMessage', (messageObject) => {
//     messages.push(messageObject)
//     console.log(messages)
//     writeChatLog()
//     // Send messages to all users
//     io.emit('server:sendMessages', messages)
//   })
// })