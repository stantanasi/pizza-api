const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

app.use((req, res, next) => {
  mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => next())
    .catch(err => next(err))
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = +(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})