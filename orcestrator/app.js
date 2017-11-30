const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const dotenv = require('dotenv').config()
const cors = require('cors')

const transactions = require('./routes/transactions')
const users = require('./routes/users')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/transactions', transactions)

app.use('/users', users)

app.listen(3000, (err) => {
  if(err) {
    console.log("Error, ", err);
  } else {
    console.log("connected");
  }
})

module.exports = app
