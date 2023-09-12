import { Router } from 'express'
import cartDao from '../dao/dbmanager/carts.dao.js'
import productDao from '../dao/dbManager/products.dao.js'


const router = Router()

router.get('/', async (req, res) => {
  try {
    res.json(await cartDao.getAll())
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.get('/:cid', async (req, res) => {
  const cid = (req.params.cid)
  try {
    res.json(await cartDao.getById(cid))    
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    await cartDao.create(req.body)
    res.json({ status: 'Cart created' })
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.post('/:cid/product/:id', async (req, res) => {
  const { cid, id} = req.params
  let stock
  const { quantity } = req.body

  try {
    stock = await productDao.getById(id)
    if(!stock) {
      res.status(400).json({"error": "Product is unavailable at the moment"})
    } else {
      try {
        const product = { productId: id, quantity: quantity}
        cartDao.update(cid, product)
        res.json({ message: 'The cart has been updated' })
      } catch (error) {
        res.json({ error: error.message })    
      }
    }
    
  } catch (error) {
    res.json({ error: error.message })
  }
})

export default router