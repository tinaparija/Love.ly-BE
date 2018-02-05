var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  User = require('./user');

var MatchSchema = new Schema({
  user_id: {
              type: Schema.Types.ObjectId,  //foreign key for user
              ref: 'User'
           },
  favourite: Boolean
});

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
