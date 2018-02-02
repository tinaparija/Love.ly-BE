var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Values = require('./values');

var UserSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  image_url: String,
  description: String,
  location: String,
  values:[Values.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
