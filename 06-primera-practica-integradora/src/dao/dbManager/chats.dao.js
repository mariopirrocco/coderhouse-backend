import { chatModel } from '../../models/chat.model.js'

class ChatDao {
  async getAll() {
    const messages = await chatModel.find()
    if (messages === null ) {
      return []
    } else {
      return messages
    }
    
  }
  async getById(id) {
    return await chatModel.findById(id)
  }
  async create(data) {
    return await chatModel.create({
      user: data.user,
      message: data.message
    })
  }
  async update(id, data) {
    return await chatModel.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await chatModel.findByIdAndDelete(id)
  }
}

export default new ChatDao()