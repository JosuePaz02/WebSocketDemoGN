const express = require('express')
const http = require('http')
const cors = require('cors')
const setupWebSocket = require('./ws-handler');



const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor DemoGN-GPS activo')
})

const server = http.createServer(app)
setupWebSocket(server);


const PORT = 3000
server.listen(PORT, () => {
    console.log(`🚀 Server on port ${PORT}`)
})