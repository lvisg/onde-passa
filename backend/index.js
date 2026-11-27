require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app =express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
     return res.json({"app": "OndePassa", "status": "online"})
})
const port = 3000
app.listen(port, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})
