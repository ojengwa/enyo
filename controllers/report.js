'use strict';

// Load required packages
var reportModel = require('../models/report'),
    services = require('../services/crud');

// Create endpoint /api/reports for POST
exports.postReports = function (req, res) {
  
  services.doPost(reportModel, req.body, function (err, obj){
    res.json({ response: err || obj });
  });
};

// Create endpoint /api/reports for GET
exports.getReports = function (req, res) {

  services.getAll(reportModel, function (err, obj) {
    res.json({response: err || obj});
  });
};

// Create endpoint /api/reports/:report_id for GET
exports.getReport = function (req, res) {
  // Use the Report model to find a specific report
  var id = req.params.id;

  services.getOne(reportModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};

// Create endpoint /api/reports/:report_id for PUT
exports.putReport = function (req, res) {
  // Use the Report model to find a specific report
  var id = req.params.id,
      data = req.body;

  services.getOne(reportModel, data, id, function (err, obj) {
    res.json({response: err || obj });
  });
};

// Create endpoint /api/reports/:report_id for DELETE
exports.deleteReport = function (req, res) {
  // Use the Report model to find a specific report and remove it
  var id = req.params.id;

  services.getOne(reportModel, id, function (err, obj) {
    res.json({response: err || obj });
  });
};