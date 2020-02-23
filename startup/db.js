const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost/pos', {useNewUrlParser: true},() => {
    console.log('Database connected!');
  });
}
