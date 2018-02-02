var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  image_url: String,
  description: String,
  location: String,
  values:[ValuesSchema],

});

var User = mongoose.model('User', UserSchema);

module.exports = User;
