// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var projectsList = [{
  projectsObj1KeyOne: 'keyOneValuePair',
  projectsObj1keyTwo: 'keyOneValuePair',
  projectsObj1keyThree: 'keyOneValuePair',
  projectsObj1keyFourArray: [ 'arrayIndex0', 'arrayIndex1' ]
}, {
  artistName: 'Metallica',
  name: 'Metallica',
  releaseDate: '1991, August 12',
  genres: [ 'heavy metal' ]
}, {
  artistName: 'The Prodigy',
  name: 'Music for the Jilted Generation',
  releaseDate: '1994, July 4',
  genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
}, {
  artistName: 'Johnny Cash',
  name: 'Unchained',
  releaseDate: '1996, November 5',
  genres: [ 'country', 'rock' ]
}];


db.Project.remove({}, function(err, projects){
  // code in here runs after all projects are removed
  db.Project.create(projectsList, function(err, projects){
    // code in here runs after all projects are created
    if (err) { return console.log('ERROR', err); }
    console.log("all projects:", projects);
    console.log("created", projects.length, "projects");
    process.exit();
  });
});
