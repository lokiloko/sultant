const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
// const dotenv = require('dotenv').config()
const cors = require('cors')

const transactions = require('./routes/transactions')
const users = require('./routes/users')
const ocr = require('./routes/ocr')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/transactions', transactions)

app.use('/users', users)
app.use('/ocr', ocr)

app.listen(3000, () => {
  console.log("connected");
})

module.exports = app
