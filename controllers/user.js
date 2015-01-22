'use strict';

// Load required packages
var userModel = require('../models/user'),
    services = require('../services/crud'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Utils = require('../core/utils').Utils, 
    auth = require('../services/auth');


// Create endpoint /api/v1/users for POST
exports.signup = function (req, res) {
  var token;
  
  services.doPost(userModel, req.body, function (err, obj){

    if (obj) {
      token = jwt.sign(obj, Utils.salt);
      auth.saveToken(obj._id, token);
      res.setHeader('authorization', 'Bearer ' + token);
      obj = _.pick(obj, ['id', 'firstname', 'lastname', 'email', 'roles', 'created']);
    }

    res.json({ response: err || obj });
  });
};

// Create endpoint /api/v1/users for GET
exports.getUsers = function (req, res) {
  services.getAll(userModel, function (err, obj) {
    res.json({response: err || obj});
  });
};

// Create endpoint /api/v1/users/:id for GET
exports.getUser = function (req, res) {
  var id = req.params.id;

  services.getOne(userModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};

// Create endpoint /api/v1/users/:id for UPDATE
exports.putUser = function (req, res) {
  var id = req.params.id,
      data = req.body;

  services.getOne(userModel, data, id, function (err, obj) {
    res.json({response: err || obj });
  });

};

//Create endpoint for /api/v1/users/:id/delete DELETE
exports.deleteUser = function (req, res) {
  var id = req.params.id;

  services.getOne(userModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};