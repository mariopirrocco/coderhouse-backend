import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import __dirname from './dirname.js'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import viewsRoute from './routes/views.route.js'
// import cartsRoute from './routes/carts.route.js'
import productRoutes from './routes/products.route.js'
import path from 'path'

const app = express()
const PORT = 3000

// Mongoose
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://mpirrocco:y33uRE4Uu35CgUX9@coder.unfgglh.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
  if(error) {
    console.log('error', error)
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
// app.use('/api/carts', cartsRoute)


app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`))