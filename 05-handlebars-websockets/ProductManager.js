import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
  }

  async getProducts() {
    let products = await fs.promises.readFile(this.path)    
    return products = JSON.parse(products)  
  }

  async addProduct(prodArray) {
    console.log('adding product called')
    try {
      
        await fs.promises.writeFile(this.path, JSON.stringify(prodArray, null, '\t'))    
      
      return newProd

    } catch(error) {
      return `There was a problem adding your product, error: ${error}`
    }    
  }
}

export default new ProductManager('./db/catalogue.json')