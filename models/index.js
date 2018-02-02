var mongoose = require("mongoose");

// mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/love.ly", {useMongoClient: true});
mongoose.connect( process.env.PORT || "mongodb://localhost/love_ly", {useMongoClient: true});

mongoose.Promise = global.Promise;  // use native Promise


module.exports.User = require("./user");
module.exports.Values = require("./values");
module.exports.Match = require("./match");
