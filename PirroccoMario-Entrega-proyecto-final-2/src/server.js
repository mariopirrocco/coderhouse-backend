import express from 'express'
const { Router } = express

import ProductsDaoMongoDB from './daos/products/ProductsDaoMongoDB.js'
import CartsDaoMongoDB from './daos/products/CartsDaoMongoDB.js'

const app = express()

const isAdmin = true

function errorIsNotAdmin(route, method) {
  const error = {
    error: -1
  }
  if(route && method) {
    error.descripcion = `route '${route}' method '${method}' not authorized`
  }
}