import { productModel } from '../models/product.model.js'

class ProductDao {
  
  async getAll(page, limit, query, sort) {
    if(limit === 0 || !limit) {
      return await productModel.paginate(query, { paginate: false,  page: page || 1, sort: { price: sort || 0 }})
    } else {
      return await productModel.paginate(query, { page: page || 1, limit: limit || 10, sort: {price: sort || 0 }})
    }
  }
  async getById(id) {
    return await productModel.findById(id)
  }
  async create(data) {
    return await productModel.create(data)
  }
  async update(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await productModel.findByIdAndDelete(id)
  }
}

export default new ProductDao()