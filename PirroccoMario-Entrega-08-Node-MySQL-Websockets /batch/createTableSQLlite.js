import knex from 'knex'
import { configSQLlite } from '../utils/configSQLlite.js'

const knexCli = knex(configSQLlite.db)

knexCli.schema.dropTableIfExists('messages')
  .then(() => {
    knexCli.schema.createTable('messages', (table) => {
      table.increments('id').primary(),
      table.string('email', 50).notNullable(),
      table.string('message', 500).notNullable(),
      table.integer('date', 100).notNullable()
    })
    .then( () => console.log('table created'))
    .catch(( error) => {
      console.log(error)
      throw error
    })
    .finally(() => {
      knexCli.destroy()
    })
  })

