var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MatchSchema = new Schema({
  user_id: [{
              type: Schema.Types.ObjectId,  //foreign key for user
              ref: 'User'
           }],
  favourite:boolean
});

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
