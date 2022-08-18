const express = require('express')
const app = express()
const port = 8080
const routes = require('./routes')

app.use(express.urlencoded({ extended: true, }));
app.use(express.json());
app.use('/css', express.static(`${__dirname}/css`))
app.use(express.static(`${__dirname}/public`))

app.use('/', routes)

app.listen(port, (err) => {
    if(err) {
        console.log(`There was an error initializing the server: ${err}`)
    } else {
        console.log(`Server listening on ${port}`)
    }
})