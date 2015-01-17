'use strict';

//Module for performing CRUD opoerations on the server-side
var Utils = require('../core/utils').Utils;

exports.doPost = function (Model, payload, cb) {
  try {
    var Obj = new Model(payload);
    Obj.save(function (err, obj) {
      if (err) {
        console.log('should be err', err.err);
        cb(err, null);
      } else {
        console.log('should be user', obj);
        cb(null, obj);
      }
    });
  } catch (e) {
    cb(e);
  }
};

exports.doUpdate = function (Model, payload, id, cb) {
  try {
    Model.findOneAndUpdate(id, {$set: payload}, function (err, obj) {
      if (err) {
        console.log('should be err', err.err);
        cb(err, null);
      } else {
        console.log('should be user', obj);
        cb(null,obj);
      }
    });
  } catch (e) {
    cb(e);
  }
};

exports.getAll = function (Model, cb) {
  try {
     Model.find({}, Utils._filter)
      .where('isActive', true)
      .exec(function (err, obj) {
        if (err) {
          console.log('should be err', err.err);
          cb(err, null);
        } else {
          console.log('should be user', obj);
          cb(null,obj);
        }
      });
  } catch (e){
    cb(e);
  }
};

exports.getOne = function (Model, username, cb) {
  try {
    Model.find(username, Utils._filter, function (err, obj) {
      if (err) {
        console.log('should be err', err.err);
        cb(err, null);
      } else {
        console.log('should be user', obj);
        cb(null,obj);
      }
    });
  } catch (e) {
    cb(e);
  }
};

exports.doDelete = function (Model, id, cb) {
  try {
    Model.findOneAndUpdate(id, {$set: {isActive: false}}, function (err, obj) {
      if (err) {
        console.log('should be err', err.err);
        cb(err, null);
      } else {
        console.log('should be user', obj);
        cb(null,obj);
      }
    });
  } catch (e) {
    cb(e);
  }
};