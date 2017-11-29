const app = require('../app')

app.listen(3000, (err) => {
  if(err) {
    console.log("Error, ", err);
  } else {
    console.log("connected");
  }
})
