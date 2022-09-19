import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import knex from 'knex'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const config = knex({
  client: 'better-sqlite3',
  connection: {
    filename:'./db.db3'
  },
  useNullAsDefault: true
})

