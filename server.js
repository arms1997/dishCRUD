const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const dishRouter = require('./routes/dishes')

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000;

const url = 'mongodb://127.0.0.1:27017/dishCRUD'
mongoose.connect(url, {useNewUrlParser: true})

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('db succesfully connected')
})

app.use('/', dishRouter)

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
