'use strict';

var init = require('../config/init'),
    config = require('../config/config'),
    redis = require('redis'),
    jwt = require('jsonwebtoken'),

    User = require('../models/user'),

    redisClient = redis.createClient(config.redis.port, config.redis.host);
    if (config.redis.password !== '') {
        redisClient.auth(config.redis.password);
    }

redisClient.on('error', function (err) {
  console.error('Redis error', err);
});


exports.signin = function (userId, password, next) {

  User.or([{id: userId}, {email: userId}]).find(function (err, user) {
    if (err) {
      return next('Invalid user credentials');
    } 
    user.verifyPassword(password, function (err, isMatch) {
      if (err) {
        return next('Invalid user credentials');
      } else {
        next(isMatch);
      }
    });
  });
};

exports.getToken = function (req) {

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

exports.saveToken = function (userId, token) {
  redisClient.set(userId, token, redisClient.print);
  
  redisClient.quit();
};

exports.fetchToken = function (userId, cb) {

  redisClient.get(userId, function (err, token) {
    if (err) {
      console.log(err);
      cb(err, null);
    }
    cb(null, token);
  });
};