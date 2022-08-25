const { Router } = require('express')
const router = Router()
const { getRecords, addRecords, showForm } = require('../controllers/recordsController')

router.get('/records', getRecords)
router.get('/addRecord', showForm)
router.post('/records', addRecords)

module.exports = router