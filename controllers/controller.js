var models = require('../models');
var User = models.User;
var Values = models.Values;

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
          res.json(value);
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

module.exports = {
  index_users: index_users,
  create_user: create_user,
  show_user: show_user,
  add_user_values: add_user_values,
  update_user: update_user,
  update_user_values: update_user_values,
  delete_user: delete_user
};