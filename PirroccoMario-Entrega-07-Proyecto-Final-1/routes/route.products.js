const { Router } = require('express')
const routerProducts = Router()

const Container = require('../Container.js')
const catalogue = new Container('./db/catalogue.json')

const isAdmin = true

function onlyAdmin(req, res, next) {
  if(!isAdmin){
    res.status(403).json({code: 403, msg: `Forbidden access ${req.method} ${req.baseUrl}${req.url}`})
  } else {
    next()
  }
}

routerProducts.get('/', async (req, res) => {
  const data = await catalogue.listAll()
  res.json(data)
})

routerProducts.get('/:id', async (req, res) => {
  const data = await catalogue.listById(req.params.id)
  res.json(data)
})

routerProducts.post('/', onlyAdmin, async (req, res) => {
  res.json({ id: await catalogue.save(req.body) })
})

routerProducts.put('/:id/productos', async (req, res) => {
  res.json({ id: await catalogue.update(req.params.id) })
})

routerProducts.delete('/:id', onlyAdmin, async (req, res) => {
  res.json({ id: await catalogue.delete(req.params.id) })
})

module.exports = routerProducts