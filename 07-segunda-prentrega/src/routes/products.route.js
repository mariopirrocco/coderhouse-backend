import { Router } from 'express'
import productDao from '../dao/products.dao.js'

const router = Router()

router.get('/', async(req, res) => {
  try {
    
    const page = req.query.page
    const limit = req.query.limit
    const query = req.query.query || null
    const sort = parseInt(req.query.sort)


    let products = await productDao.getAll(page, limit, JSON.parse(query), sort)

    res.render('products', {
      title: 'products',
      products: products
    })

  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})


router.get('/:id', async(req, res) => {
  try {
    const product = await productDao.getById(req.params.id)
    res.json(product)    
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})
router.post('/', async(req, res) => {
  try {
    const product = await await productDao.create(req.body)
    res.redirect('/')
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})
router.put('/:id', async(req, res) => {
  try {
    const product = await productDao.update(req.params.id, req.body)
    res.json(product)    
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})
router.delete('/:id', async(req, res) => {
  console.log('called')
  try {
    const products = await productDao.delete(req.params.id)
    res.json(products)    
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

export default router
