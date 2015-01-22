'use strict';

//Module for performing CRUD opoerations on the server-side
var Utils = require('../core/utils').Utils;

exports.doPost = function (Model, payload, cb) {
  try {
    var Obj = new Model(payload);
    Obj.save(function (err, obj) {
      if (err) {
        cb(err.err, null);
      } else {
        cb(null, obj);
      }
    });
  } catch (e) {
    cb(e, null);
  }
};

exports.doUpdate = function (Model, payload, id, cb) {
  try {
    Model.findOneAndUpdate({id: id}, {$set: payload}, function (err, obj) {
      if (err) {
        cb(err.err, null);
      } else {
        cb(null,obj);
      }
    });
  } catch (e) {
    cb(e, null);
  }
};

exports.getAll = function (Model, cb) {
  try {
     Model.find({}, Utils._filter)
      .where('isActive', true)
      .exec(function (err, obj) {
        if (err) {
          cb(err.err, null);
        } else {
          cb(null, obj);
        }
        
      });
  } catch (e){
    cb(e, null);
  }
};

exports.getOne = function (Model, id, cb) {
  try {
    Model.find({id: id}, Utils._filter, function (err, obj) {
      if (err) {
        cb(err.err, null);
      } else {
        cb(null, obj);
      }
    });
  } catch (e) {
    cb(e, null);
  }
};

exports.doDelete = function (Model, id, cb) {
  try {
    Model.findOneAndUpdate({id: id}, {$set: {isActive: false}}, function (err, obj) {
      if (err) {
        cb(err.err, null);
      } else {
        cb(null, obj);
      }
    });
  } catch (e) {
    cb(e, null);
  }
};