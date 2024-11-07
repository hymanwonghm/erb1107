const express = require('express')
const { router } = require('./routers')

// Define the express app
const app = express()
const port = 3000

// Enable express app to parse JSON body
app.use(express.json())
app.use('/', router)

// Testing server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})