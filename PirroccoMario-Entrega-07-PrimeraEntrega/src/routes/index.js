const { Router } = require('express')
const router = Router()

let catalogue = [
	{"artist":"Fito Páez","record":"El amor después del amor","price":15,"id":1},
	{"artist":"Soda Stereo","record":"Canción animal","price":19,"id":2},
	{"artist":"Charly García","record":"Parte de la religión","price":17,"id":3},
	{"artist":"Particio Rey","record":"Oktubre","price":23,"id":4},
	{"artist":"Virus","record":"En vivo","price":21,"id":5}
]

router.get('/api/records', (req, res) => {
	res.send(catalogue)
})

router.post('/api/records', (req, res, next) => {
	try {
		const {artist, record, price} = req.body
		if(isNaN(Number(price))){
			const error = new Error('Price has to be a number')
			error.httpStatusCode = 400
			return next(error, req, res)
		}
		const ids = []
		catalogue.forEach((record) => {
			ids.push(record.id)
		})
		const id = Math.max(...ids) + 1
		catalogue.push({artist, record, price, id})
		res.status(200).send('<h2>Record added</h2><a href="../../">Add more records</a>')
	} catch(err) {
		res.send(`There was an error: ${err}`)
	}
})

router.get('/api/records/:id', (req, res) => {
	try {
		const id = Number(req.params.id)
		if(catalogue.length) {
			if(!isNaN(id)) {
				const recordFound = catalogue.filter((record)=> record.id === id)
				if(recordFound.length === 0) {
					res.send(`The record you are looking for doesn't exist`)
				} else {
					res.send(recordFound)				}				
			} else {
				res.send('The id you entered has to be a number')
			}
		} else {
			res.send('There are no records available at the moment')
		}
	} catch(err) {
		res.send(`There was an error: ${err}`)
	}
})

router.put('/api/records/:id', (req, res) => {
	try {
		const id = Number(req.params.id)
		if(catalogue.length) {
			if(!isNaN(id)) {
				const recordFound = catalogue.filter((record)=> record.id === id)
				
				if(recordFound.length === 0) {					
					res.send(`The record you are looking for doesn't exist`)
				} else {
					const allOtherRecords = catalogue.filter((record)=> record.id !== id)
					const { artist, record, price } = req.body
					let updateRecord = {
						artist,
						record,
						price: Number(price),
						id
					}
					catalogue = [...allOtherRecords, updateRecord]
					res.sendStatus(201)
				}
			} else {
				res.send('The id you entered has to be a number')
			}
		}

	} catch(err) {
		res.send(`There was an error: ${err}`)
	}
})

router.delete('/api/records/:id', (req, res) => {
	try {
		const id = Number(req.params.id)
		if(catalogue.length) {
			if(!isNaN(id)) {
				const recordFound = catalogue.filter((record)=> record.id === id)
				
				if(recordFound.length === 0) {					
					res.send(`The record you are looking for doesn't exist`)
				} else {
					catalogue = catalogue.filter((record)=> record.id !== id)
					res.status(200).send('Catalogue updated')
				}
			} else {
				res.send('The id you entered has to be a number')
			}
		}

	} catch(err) {
		res.send(`There was an error: ${err}`)
	}
})



module.exports = router