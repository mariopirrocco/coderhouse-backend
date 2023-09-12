import { Schema, model } from 'mongoose'

const productCollection = 'products'

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
})

export const productModel = model(productCollection, productSchema)