const RecordsCatalogue = require('../RecordsCatalogue.js')
const recordsCatalogue = new RecordsCatalogue()

const getRecords = (req, res) => {
  const catalogue = recordsCatalogue.getAll()
  res.render('records.pug', { catalogue })
}

const addRecords = (req, res) => {
  const {artist, title, price, thumbnail} = req.body 
  recordsCatalogue.newRecord(artist, title, price, thumbnail)
  res.redirect('/records')
}

const showForm = (req,res)=>{
  res.render('index.pug')
}

module.exports = {
  getRecords,
  addRecords,
  showForm
}