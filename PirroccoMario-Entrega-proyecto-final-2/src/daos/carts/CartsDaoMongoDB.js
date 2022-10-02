import ContainerMongoDB from '../../containers/ContainerMongoDB.js'

class CartsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('carts', {
      products: { type: [], required: true }
    })
  }

  async save(carts = { products: [] }) {
    return super.guardar(carts)
  }

  async disconnect() {
    
  }
}

export default CartsDaoMongoDB