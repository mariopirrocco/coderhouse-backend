const fs = require('fs')
const moment = require('moment')

class Container {
  constructor(route) {
    this.route = route
  }

  async listAll() {
    try {
      const data = await fs.promises.readFile(`./${this.route}`, 'utf-8')
			return JSON.parse(data)      
    } catch(err) {
      return []
    }
  }
  
  async listById(id) {
    try {
			const data = await this.listAll()      
      const retrieve = data.filter( prod => prod.id == id)
      
			if(retrieve.length === 0) {
				res.send('Product unavailable at the moment')
				return null
			} else {
				return retrieve
			}
		} catch(err) {
			console.log('There was an error when looking for your product: ', err)
		}
  }

  async save(objItem) {    
    const data = await this.listAll()
    let newId
    
    if(data.length === 0) {
      newId = 1
    } else {
      newId = data[data.length - 1].id + 1
    }
    const newItem = { ...objItem, id: newId, timestamp: moment().format('DD/MM/YY hh:mm:ss')}
    data.push(newItem)

    try {
      await fs.promises.writeFile(this.route, JSON.stringify(data, null, 2))
      return newId
    } catch(err) {
      throw new Error(`There was an error when saving new Item: ${err}`)
    }
  }

  async update(elem, id) {
    const data = await this.listAll()
    const index = data.findIndex( obj => obj.id == id)
    if(index == -1) {
      throw new Error(`There was an error updating product id: ${id}`)
    } else {
      data[index] = { ...elem, id }
      try {
        await fs.promises.writeFile(this.route, JSON.stringify(data, null, 2))
        return id
      } catch(err) {
        throw new Error(`There was an error: ${err}`)
      }
    }
  }

  async delete(id) {
    const data = await this.listarAll()
    const index = data.findIndex( obj => obj.id == id)
    if (index == -1) {
      throw new Error(`There was an error: could not find product with id: ${id}`)
    }
    data.splice(index, 1)
    try {
      await fs.promises.writeFile(this.route, JSON.stringify(data, null, 2))
      return index
    } catch (error) {
      throw new Error(`There was an error: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.route, JSON.stringify([], null, 2))
    } catch (error) {
      throw new Error(`There was an error: ${error}`)
    }
  }

  
}

module.exports = Container