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
    console.log("before match called");
    find_match(user, req);
    console.log("after match called");
    res.json(user);
  });

}

// GET one user 
function show_user(req, res) {
   User.findById(req.params.user_id, function(err, user) {
		res.json(user);
	});
}

// POST user values 
function add_user_values(req, res) {
	Values.create(req.body, function(err, value){
    if (err) res.end(err);
    else {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        else {
          user.values.push(value);
          user.save();
          console.log("before match called");
          find_match(user, req);
          console.log("after match called");
          res.json(user);
        }
      })
    }
  });
}


// PUT (edit) one user 
function update_user(req, res) {
	User.findByIdAndUpdate(req.params.user_id, 
  		{$set: req.body}, {"new":true}, function(err, user){
     	if (err) res.send(err);
     	else res.json(user);
   });
  
}

// PUT (edit) a user's values 
function update_user_values(req, res) {
	Values.findByIdAndUpdate(req.params.values_id, 
    {$set: req.body}, function(err, value){
	    if (err) res.send(err);
	    else res.json(value);
  	});
}

// delete a user 
function delete_user(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err, user) {
	    if (err) { console.log('error', err); }
	    res.send(200);
  	});
}


function find_match(savedUser,req){
  console.log("inputs to match method");
  console.log(savedUser._id);
    

     //get all users from db except the current user who has taken test.({_id!==req.params._id})
     User.find({'_id': {$ne: new ObjectID(savedUser._id)}}, function(err, users) {
       if (err) {
         res.send(err);
       }
       else{
         for(let match_idx=0; match_idx<users.length;match_idx++){ // loop for all possible matches in db
            let category_match_cnt=0;
           console.log("next user in db after increment" +users[match_idx]._id);
            let i=0;//looping variable for savedUser.values
            let j=0;//looping variable for other users.values
           while(i < savedUser.values.length && j < users[match_idx].values.length){ // loop for values array of savedUser and one of the possible matches
             
             if(savedUser.values[i].name===users[match_idx].values[j].name){
              console.log(savedUser.values[i].name);
              console.log(users[match_idx].values[j].name);
               if(savedUser.values[i].priority===users[match_idx].values[j].priority){
                 if((savedUser.values[i].score===users[match_idx].values[j].score)) {
                  
                      category_match_cnt +=1;
                      console.log("match count");
                      console.log(category_match_cnt);
                   }
               }
             }
             
             j++;
             i++;

           }
           if(category_match_cnt>=3){
                savedUser.matches.push({user_id : users[match_idx]._id, favourite : false});
                console.log("possible matches: " +savedUser.matches);
                // choose next possible match if previous index is found as match and pushed to savedUser.matches array.
             }
            console.log("next user in db before increment" +users[match_idx]._id);
         }
       savedUser.save();
     }
   });
 }

module.exports = {
  index_users: index_users,
  create_user: create_user,
  show_user: show_user,
  add_user_values: add_user_values,
  update_user: update_user,
  update_user_values: update_user_values,
  delete_user: delete_user
};