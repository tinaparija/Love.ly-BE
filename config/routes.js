var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');

//User Routes
router.get('/api/users', controller.index_users);
router.post('/api/users/', controller.create_user);
router.get('/api/users/:user_id', controller.show_user);
router.put('/api/users/:user_id', controller.update_user);
router.delete('/api/users/:user_id', controller.delete_user);


module.exports = router;