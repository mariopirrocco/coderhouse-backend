import knex from 'knex'
import { configSQLlite } from '../utils/configSQLlite.js'

export class ContainerSQLlite {
  constructor(tableName) {
    this.tableName = tableName
    this.knexCli = knex(configSQLlite.db)
  }

  async listAll() {
    try {
      return await this.knexCli.from(this.tableName).select('*').orderBy('id', 'asc')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  async list(id) {
    try {
      return await this.knexCli.from(this.tableName).select('*').where({id: id})
    } catch(error) {
      console.log(error)
      throw error
    }
  }
  
  async insert(obj) {
    try {
      return await this.knexCli(this.tableName).insert(obj)
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  async update(id, obj) {
    try {
      return await this.knexCli.from(this.tableName).where({id: id}).update(obj)
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  async delete(id) {
    try {
      return await this.knexCli.from(this.tableName).where({id: id}).del()
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  closeConnection() {
    this.knexCli.destroy()
  }
}