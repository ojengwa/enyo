'use strict';

// Load required packages
var userModel = require('../models/user'),
    services = require('../services/crud');


// Create endpoint /api/v1/users for POST
exports.postUsers = function (req, res) {
  services.doPost(userModel, req.body, function (err, obj){
    res.json({ response: err || obj });
  });
};

// Create endpoint /api/v1/users for GET
exports.getUsers = function (req, res) {
  services.getAll(userModel, function (err, obj) {
    res.json({response: err || obj});
  });
};

// Create endpoint /api/v1/users/:userId for GET
exports.getUser = function (req, res) {
  var userId = req.params.userId;

  services.getOne(userModel, userId, function (err, obj) {
    res.json({response: err || obj });
  });
};

// Create endpoint /api/v1/users/:userId for UPDATE
exports.putUser = function (req, res) {
  var userId = req.params.userId,
      payload = req.body;

  services.getOne(userModel, userId, function (err, obj) {
    res.json({response: err || obj });
  });

};

//Create endpoint for /api/v1/users/:userId/delete DELETE
exports.deleteUser = function (req, res) {
  var userId = req.params.userId;

  User.findOne(userId, function (err, user) {

    if (err) {
      res.send(err);
    }  else if (!user.isActive) {
      res.send({code: 404, message: 'The requested resource was not found!'});
    } else{
      User.update({userId: userId}, {$set: {isActive: false}}, function (err) {
        if (err) {
          res.send(err);
        }
        res.json({code: 200, message: "User deleted successfully"});
      });
  }
  });
};