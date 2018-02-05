// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var UsersList = [{
                    name: "Adam",
                    age: 25,
                    gender: "M",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis      pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Nick",
                    age: 26,
                    gender: "M",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis      pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
                    location: "225 Bush Street,SFO"
                 },
                 {  name: "Angelina",
                    age: 22,
                    gender: "F",
                    image_url: "https://profile.actionsprout.com/default.jpeg",
                    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis      pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
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
