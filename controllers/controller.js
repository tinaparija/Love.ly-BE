var models = require('../models');
var User = models.User;
var Values = models.Values;
var ObjectID = require('mongodb').ObjectID;

// GET all users
function index_users(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    else res.json(users);
  });
}

// POST one user
function create_user(req, res) {
   User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    res.json(user);
  });
}

// GET one user
function show_user(req, res) {
   User.findById(req.params.user_id, function(err, user) {
        res.json(user);
    });
}

// PUT (edit) one user
function update_user(req, res) {
    User.findByIdAndUpdate(req.params.user_id,
        {$set: req.body}, {"new":true}, function(err, user){
        if (err) res.send(err);
        else {
        find_match(user, res);
      }
   });
}

// delete a user
function delete_user(req, res) {
    User.findByIdAndRemove(req.params.user_id, function(err, user) {
        if (err) { console.log('error', err); }
        res.send(200);
    });
}

function getMatchCount(savedUser,eachuserInDb){
  let i=0;//looping variable for savedUser.values
  let j=0;//looping variable for other users.values
  let categ_match_cnt=0;
  while(i < savedUser.values.length && j < eachuserInDb.values.length){ // loop for values array of savedUser and one of the possible matches
   if(savedUser.values[i].name===eachuserInDb.values[j].name){
     if(savedUser.values[i].priority===eachuserInDb.values[j].priority){
       if((savedUser.values[i].score > eachuserInDb.values[j].score-5 && savedUser.values[i].score < eachuserInDb.values[j].score+5)){
             categ_match_cnt +=1;
          }
     }
   }
   j++;
   i++;
 }
 return categ_match_cnt;
}

function addSelfToMatchesRecord(savedUser,users){
  if(savedUser.matches){
     for(let idx=0; idx<users.length;idx++){
       for(let match_idx=0;match_idx<savedUser.matches.length;match_idx++){
         if(users[idx]._id===savedUser.matches[match_idx].user_id){
           users[idx].matches.push({user_id : savedUser._id, favourite: false});
           users[idx].save();
         }
       }
     }
  }
}

function find_match(savedUser, res){
     //get all users from db except the current user who has taken test.
     User.find({'_id': {$ne: new ObjectID(savedUser._id)}}, function(err, users) {
       if (err) {
         res.send(err);
       }
       else{
             for(let match_idx=0; match_idx<users.length;match_idx++){ // loop for all possible matches in db
                let category_match_cnt=0;
                category_match_cnt = getMatchCount(savedUser,users[match_idx]);
                if(category_match_cnt>=3){
                    savedUser.matches.push({user_id : users[match_idx]._id, favourite : false});
                    console.log("possible matches: " +savedUser.matches);
                 }
             }
             savedUser.save(function(err,saved){
               if(err){
                 res.send(err);
               }
               else{
                 res.json(saved);
               }
             });
             //loop through the savedUser.matches array and update each of their matches array with this new savedUser.user_id
             addSelfToMatchesRecord(savedUser,users);
         }
   });
 }


module.exports = {
  index_users: index_users,
  create_user: create_user,
  show_user: show_user,
  update_user: update_user,
  delete_user: delete_user
};