/*-------- Modules --------*/
const fs = require('fs')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const path = require('path')
const { Server:IOServer } = require('socket.io')

/*-------- Middleware --------*/

app.use(express.static(path.join(__dirname, '/public')))


/*-------- Server --------*/
const port = 8081

const expressServer = app.listen(port, (err) => {
  if(err) {
    console.log(`There was an error connecting to the server`)
  } else {
    console.log(`Server is running on port: ${port}`)
  }
})

const io = new IOServer(expressServer)

/*-------- Chat log and catalogue initialization --------*/
let data = []
let messages = []

async function writeChatLog() {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, '/chat'),
      JSON.stringify(messages)
    );
  } catch (err) {
    console.log('Chat log could not be saved', err);
  }
}

/*-------- Connections --------*/
io.on('connection', async(socket) => {
  console.log(`User id: ${socket.id} has joined the conversation`)
  console.log(`There are ${messages.length} messages in chat`)

  // Send all records
  socket.emit('server:sendRecords', data)

  socket.on('client:sendRecord', (recordObject) => {
    data.push(recordObject)
    console.log(data)
    // Send records to all users
    io.emit('server:sendRecords', data)
  })

  // Send chat messages
  socket.emit('server:sendMessages', messages)

  socket.on('client:sendMessage', (messageObject) => {
    messages.push(messageObject)
    console.log(messages)
    writeChatLog()
    // Send messages to all users
    io.emit('server:sendMessages', messages)
  })
})