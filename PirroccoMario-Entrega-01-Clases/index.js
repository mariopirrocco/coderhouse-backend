class User {
	constructor(name, lastName, books = [{}], pets = []) {
		this.name = name
		this.lastName = lastName
		this.books = books
		this.pets = pets
	}

	getFullName() {
		return `Nombre Completo: ${this.name} ${this.lastName}`
	}

	addMascota(...namess) {
		this.pets.push(...namess)
	}

	countPets() {
		return this.pets.length
	}

  addBook(...books) {
		this.books.push(...books)
	}

	getBookNames() {
		const nombreLibros = this.books.map(function(libro, index) {
			return `Libro ${index + 1}: ${libro.nombre}`
		})
		return nombreLibros
	}
}


const marioPirrocco = new User('Mario', 'Pirrocco', [], [])

marioPirrocco.addMascota('Greta', 'Firulais', 'Ramona')
marioPirrocco.addBook(
  { nombre:'La conjura de los necios', autor:'John Kennedy Toole' },
	{ nombre:'El Padrino', autor:'Mario Puzo' },
	{ nombre:'Una canción de hielo y fuego', autor:'George R. R. Martin' }
)

console.log(marioPirrocco.getFullName())
console.table(marioPirrocco.getBookNames())
console.log(`Cantidad de mascotas: ${marioPirrocco.countPets()} `)
console.log(marioPirrocco.pets)
