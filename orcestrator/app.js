const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const dotenv = require('dotenv').config()
const cors = require('cors')

const ocr_ktp = require('./routes/ocr_ktp')
const ocr_pricetag = require('./routes/ocr_pricetag')
const transactions = require('./routes/transactions')
const users = require('./routes/users')
const sugestion = require('./routes/sugestion')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/ocr_ktp', ocr_ktp)
app.use('/ocr_pricetag', ocr_pricetag)
app.use('/sugestion', sugestion)
app.use('/transactions', transactions)
app.use('/users', users)

app.listen(3000, (err) => {

  console.log("connected");

})

module.exports = app
