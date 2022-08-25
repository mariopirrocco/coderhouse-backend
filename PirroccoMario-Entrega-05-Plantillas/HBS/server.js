const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const rutas = require('./routes/index')
const puerto =8080
const path = require('path')

app.engine("hbs", engine({
      extname:".hbs",
      defaultLayout:'index.hbs',
      layoutsDir:__dirname + "/views/layouts",
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, '/css')))
app.use('/', rutas)

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.listen(puerto, (err) => {
  if(err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`)
  } else {
    console.log(`Servidor escuchando puerto: ${puerto}`)
  }
})