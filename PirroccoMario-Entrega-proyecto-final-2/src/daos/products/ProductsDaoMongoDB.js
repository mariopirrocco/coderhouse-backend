import ContainerMongoDB from '../../containers/ContainerMongoDB.js'

class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true }
    })
  }
}

export default ProductsDaoMongoDB