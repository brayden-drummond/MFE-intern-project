const express = require('express')
const path = require('path')
const port = 2500

const cors = require('cors');

const firmwareRoutes = require('./routes/firmwareRoutes')

const server = express()
server.use(cors());

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/firmware', firmwareRoutes)

server.listen(port, () => {
    console.log(`listening on ${port}`)
  })

module.exports = server