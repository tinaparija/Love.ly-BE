// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var UsersList = [{
                    name: "Adam",
                    age: 29,
                    gender: "M",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                    location: "225 Bush Street,SFO"

                 },
                 {  name: "Nick",
                    age: 26,
                    gender: "M",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Jessica",
                    age: 26,
                    gender: "F",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Amy",
                    age: 24,
                    gender: "F",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Chuck",
                    age: 27,
                    gender: "M",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Angelina",
                    age: 22,
                    gender: "F",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                    location: "225 Bush Street,SFO",
                 }];


var ValuesList =
  [{name:"humour",priority:1,score:10},
  {name:"intelligence",priority:2,score:15},
  {name:"materialism",priority:3,score:25},
  {name:"empathy",priority:4,score:15},
  {name:"physical_needs",priority:5,score:15}];


UsersList.forEach(function(user) {
  user.values = ValuesList;
});

db.User.remove({}, function(err, users){
  // code in here runs after all users are removed
  db.User.create(UsersList, function(err, users){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  });
});
