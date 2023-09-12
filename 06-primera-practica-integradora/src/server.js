import express from 'express'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import __dirname from './dirname.js'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import viewsRoute from './routes/views.route.js'
import productsRoute from './routes/products.route.js'
import cartsRoute from './routes/carts.route.js'
import chatsRoute from './routes/chats.route.js'
import chatDao from './dao/dbManager/chats.dao.js'
import productRoutes from './routes/products.route.js'
import path from 'path'


// Server config
const app = express()
const PORT = 3030
const httpServer = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// Socket
const io = new Server(httpServer)

// Mongoose
mongoose.set('strictQuery', true)
// mongoose.connect('mongodb://localhost:27017/ecommerce', (error) => {
  mongoose.connect('mongodb+srv://mpirrocco:y33uRE4Uu35CgUX9@coder.unfgglh.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
  if(error) {
    console.log('error')
  } else {
    console.log('Connected to MongoDB')
  }
})

// Handlebars
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

// Express config
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
// app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', viewsRoute)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartsRoute)
app.use('/chat', chatsRoute)

// Socket
io.on('connection', async (socket) => {
  console.log('A new client has logged in')
  
  const messages = await chatDao.getAll()

  socket.on('message', async (data) => {
    messages.push(data)
    const msg = {
      user: data.user,
      message: data.message
    }
    await chatDao.create(msg)
    io.sockets.emit('messagesLogs', messages)
  })
})








