const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto =8080
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, '/css')))
app.use('/', rutas)

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.listen(puerto, (err) => {
  if(err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`)
  } else {
    console.log(`Servidor escuchando puerto: ${puerto}`)
  }
})