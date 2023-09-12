import { Router } from 'express'
import productDao from '../dao/dbManager/products.dao.js'

const router = Router()

router.get('/', async (req, res) => {
  const products = await productDao.getAll()

  res.render('index', {
    title: 'Coder WebStore',
    products: products
  })
})

router.get('/edit/:id', async (req, res) => {
  const product = await productDao.getById(req.params.id);
  res.render('edit', { title: 'Edit', product });
  
})

router.get('/delete/:id', async(req, res) => {
  
  try {
    const products = await productDao.delete(req.params.id)
    res.redirect('/')    
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

export default router