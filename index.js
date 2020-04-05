const express = require('express')
const cors = require('cors')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = 3030

app.use(express.json())
app.use(cors())
app.use('/',router)
setupDB()

app.listen(port, () => {
    console.log('listening on port',port)
})