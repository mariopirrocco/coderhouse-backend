const Container = require('./Container')

let catalogue = new Container('catalogue.txt')

const record1 = {
	artist: 'Fito Páez',
	record: 'El amor después del amor'
}
const record2 = {
	artist: 'Soda Stereo',
	record: 'Canción animal'
}
const record3 = {
	artist: 'Charly García',
	record: 'Parte de la religión'
}

const masterControl = async() => {
	// load catalogue
	await catalogue.save(record1)
	await catalogue.save(record2)
	await catalogue.save(record3)
	
	// get all records
	await catalogue.getAllRecords()	
	
	// find record by id
	await catalogue.getById(3)
	
	// delete record by id 
	await catalogue.deleteById(1)
	
	// delete all records
	await catalogue.deleteAll()
}

masterControl();

