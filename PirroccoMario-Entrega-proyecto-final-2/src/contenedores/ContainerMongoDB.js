import mongoose from 'mongoose'
import config from '../utils/config.js'

async function connect() {
  await mongoose.connect(config.mongodb.connStr, config.mongodb.options)
}
connect()

class ContainerMongoDB {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async list(id) {
    
  }

  async listAll() {
    
  }

  async save(newDoc) {
    
  }

  async update(newDoc) {
    
  }

  async delete(id) {
    
  }

  async deleteAll() {
    
  }
}

export default ContainerMongoDB
