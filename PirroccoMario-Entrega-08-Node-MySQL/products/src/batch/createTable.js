import knex from 'knex'
import { config } from '../utils/config.js'

const knexCli = knex(config.db)

knexCli.schema.dropTableIfExists('records')
  .then(() => {
    knexCli.schema.createTable('records', (table) => {
      table.increments('id').primary(),
      table.string('artist', 50).notNullable(),
      table.string('record', 50).notNullable(),
      table.string('format', 20).notNullable(),
      table.integer('price').notNullable(),
      table.string('image', 300).notNullable()
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
