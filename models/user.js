'use strict';

// Load required packages
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;


// Define our user schema
var UserSchema = new Schema({

  firstname: {
    type: String,
    required: 'You must enter you first name',
    trim: true
  },

  lastname: {
    type: String,
    required: 'You must enter you last name',
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: 'You must enter an email address',
    trim: true
    // match: [^\[A-Z0-9._%+-\]+@andela.co$, "Please enter your valid company email address"]
  },

  id: {
    type: String,
    unique: true
  },

  password: {
    type: String,
    required: 'You must enter a password'
  },

  isActive: { 
    type: Boolean,
    default: true
  },

  created: { 
    type: Date , 
    default: Date.now 
  },

  roles: {
    type: [{
      type: String,
      enum: ['fellow', 'trainer', 'ninja', 'manager', 'director', 'admin']
    }],
    default: ['fellow']
  },

  linkedAccounts: [{
    name: {
      type: String,
      required: true
    },

    oauthToken: {
      type: String,
      default: ''
    },
    
    oauthSecret: {
      type: String,
      default: ''
    }
  }]

});


// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
  var user = this,
      email = this.email,
      sep = email.lastIndexOf('@');

  user.id = email.substr(0, sep);

  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
    return callback();
  }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);