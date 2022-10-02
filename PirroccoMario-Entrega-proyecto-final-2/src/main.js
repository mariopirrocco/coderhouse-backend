import app from './server.js'

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${server.address().port}`)
})
server.on('error', error => console.log(`There is an error: ${error} on the server`))