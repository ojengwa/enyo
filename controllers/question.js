'use strict';

// Load required packages
var questionModel = require('../models/question'),
    services = require('../services/crud');


// Create endpoint /api/v1/users for POST
exports.postUsers = function (req, res) {
  
  services.doPost(questionModel, req.body, function (err, obj){
    res.json({ response: err || obj });
  });
};

// Create endpoint /api/v1/users for GET
exports.getUsers = function (req, res) {
  
  services.getAll(questionModel, function (err, obj) {
    res.json({response: err || obj});
  });
};

// Create endpoint /api/v1/users/:id for GET
exports.getUser = function (req, res) {
  var id = req.params.id;

  services.getOne(questionModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};

// Create endpoint /api/v1/users/:id for UPDATE
exports.putUser = function (req, res) {
  var id = req.params.id,
      data = req.body;

  services.getOne(questionModel, data, id, function (err, obj) {
    res.json({response: err || obj });
  });

};

//Create endpoint for /api/v1/users/:id/delete DELETE
exports.deleteUser = function (req, res) {
  var id = req.params.id;

  services.getOne(questionModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};