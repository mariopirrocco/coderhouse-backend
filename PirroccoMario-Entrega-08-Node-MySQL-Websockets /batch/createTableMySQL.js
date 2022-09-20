import knex from 'knex'
import { configMySQL } from '../utils/configMySQL.js'

const knexCli = knex(configMySQL.db)

knexCli.schema.dropTableIfExists('records')
  .then(() => {
    knexCli.schema.createTable('records', (table) => {
      table.increments('id').primary(),
      table.string('artist', 50).notNullable(),
      table.string('title', 50).notNullable(),
      table.integer('price').notNullable(),
      table.string('thumbnail', 300).notNullable()
    })
      .then(() => console.log('table created'))
      .catch((err) => {
        console.log(err)
        throw err
      })  
      .finally(() => {
        knexCli.destroy()
      })
  })
