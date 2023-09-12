import { Router } from 'express'
import chatDao from '../dao/dbManager/chats.dao.js'

const router = Router()

router.get('/', async (req, res) => {
  const chats = await chatDao.getAll()

  res.render('chat', {
    title: 'Chat App Running'
  })

  
})

export default router