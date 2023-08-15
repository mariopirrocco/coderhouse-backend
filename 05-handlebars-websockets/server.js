import express from 'express'
import ProductManager from './ProductManager.js'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io'
import fs from 'fs'

const app = express()
const httpServer = app.listen(3001, ()=> {console.log('Server running on port 3001')})

const io = new Server(httpServer)

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))


let loadedProducts = fs.readFileSync('./db/catalogue.json')
loadedProducts = JSON.parse(loadedProducts)

const saveNewProduct = async (data) => {
  console.log('save new product called')
  // const loadedProducts = JSON.stringify(data)
  await ProductManager.addProduct(data)
}

app.use('/', viewsRouter)

io.on('connection', (socket) => {
  console.log('Se ha conectado un nuevo cliente')

  socket.emit('loaded products', loadedProducts)

  socket.on('new product', (data) => {
    const newProduct = {
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock
    }
    loadedProducts.push(newProduct)

    io.emit('loaded products', loadedProducts)

    saveNewProduct(loadedProducts)
  })

})



