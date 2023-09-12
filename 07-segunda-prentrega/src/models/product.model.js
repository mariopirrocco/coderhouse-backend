import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'
const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
})

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema)