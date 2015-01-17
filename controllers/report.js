// Load required packages
var Report = require('../models/report');

// Create endpoint /api/reports for POST
exports.postReports = function (req, res) {
  // Create a new instance of the Report model
  var report = new Report();

  // Set the report properties that came from the POST data
  report.title = req.body.title;
  report.content = req.body.content;
  report.creator_id = req.user._id;

  // Save the report and check for errors
  report.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Report created successfully!', data: report });
  });
};

// Create endpoint /api/reports for GET
exports.getReports = function (req, res) {
  // Use the Report model to find all report
  Report.find({ creator_id: req.body.creator_id }, function (err, reports) {
    if (err) {
      res.send(err);
    }

    res.json(reports);
  });
};

// Create endpoint /api/reports/:report_id for GET
exports.getReport = function (req, res) {
  // Use the Report model to find a specific report
  Report.find({ creator_id: req.user._id, _id: req.params.report_id }, function (err, report) {
    if (err) {
      res.send(err);
    }

    res.json({status_code: 200, report: report});
  });
};

// Create endpoint /api/reports/:report_id for PUT
exports.putReport = function (req, res) {
  // Use the Report model to find a specific report
  Report.update({ creator_id: req.user._id, _id: req.params.report_id }, { title: req.body.title, content: req.body.content }, function(err, num, raw) {
    if (err) {
      res.send(err);
    }

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/reports/:report_id for DELETE
exports.deleteReport = function (req, res) {
  // Use the Report model to find a specific report and remove it
  Report.remove({ creator_id: req.user._id, _id: req.params.report_id }, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Report removed from the database!' });
  });
};