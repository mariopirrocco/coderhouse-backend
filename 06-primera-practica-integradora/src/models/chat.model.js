import { Schema, model } from 'mongoose'

const chatCollection = 'messages'

const chatSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
})

export const chatModel = model(chatCollection, chatSchema)