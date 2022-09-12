const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const routerProducts = require('./routes/route.products.js')
const routerCarts = require('./routes/route.carts.js')

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCarts)


app.listen(process.env.PORT || 8080, () => {
	console.log('Server is up and running')
})
