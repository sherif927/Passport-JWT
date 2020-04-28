const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Connected to Database Successfully ✨✨') },
  err => { console.log(err) }
);

module.exports = mongoose;