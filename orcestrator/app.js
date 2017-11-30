var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// const dotenv = require('dotenv').config()
const cors = require('cors')
const transactions = require('./routes/transactions')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/transactions', transactions)

app.listen(3000, (err) => {
  if(err) {
    console.log("Error, ", err);
  } else {
    console.log("connected");
  }
})

module.exports = app
