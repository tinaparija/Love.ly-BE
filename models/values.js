var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ValuesSchema = new Schema({
  name: String,
  priority: Number,
  score: Number
});

var Values = mongoose.model('Values', ValuesSchema);

module.exports = Values;
