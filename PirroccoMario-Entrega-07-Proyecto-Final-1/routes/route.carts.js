const { Router } = require('express')
const routerCarts = Router()

const Container = require('../Container')
const carts = new Container('./db/carts.json')
const products = new Container('./db/catalogue.json')

routerCarts.post('/', async (req, res) => {
  res.json({ id: await carts.save({ products: [] }) })
})

routerCarts.get('/:id', async (req, res) => {
  res.json(( await carts.listAll() ))  
})

routerCarts.get('/:id/productos', async (req, res) => {
  const cart = await carts.listById(req.params.id)
  res.json(cart.products)
})

routerCarts.post('/:id/productos', async (req, res) => {
  const cart = await carts.listById(req.params.id)
  const product = await productsApi.listById(req.body.id)
  cart.products.push(product)
  await carts.update(cart, req.params.id)
  res.end()
})

routerCarts.delete('/:id', async (req, res) => {
  res.json(await carts.delete(req.params.id))
})

routerCarts.delete('/:id/productos/:idProd', async (req, res) => {
  const cart = await carts.listById(req.params.id)
  const index = cart.products.findIndex( prod => prod.id == req.params.idProd)
  if (index != -1) {
    cart.products.splice(index, 1)
    await carts.update(cart, req.params.id)
  }
  res.end()
})

module.exports = routerCarts 
