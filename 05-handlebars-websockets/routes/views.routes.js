import { Router } from 'express'
const router = Router()
import ProductManager from '../ProductManager.js'

router.get('/', async (req, res) => {

  const products = await ProductManager.getProducts()
  
  res.render('home', {
    title: 'Proyecto con websocket',
    heading: 'This is the main page',
    products
  })
  
})

router.get('/realtimeproducts', async (req, res) => {  
  res.render('realTimeProducts', {
    title: 'Products in real time',
    heading: 'Products in real time',
  })
  
})

export default router