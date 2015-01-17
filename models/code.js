'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our token schema
var CodeSchema   = new Schema({

  value: { 
    type: String, 
    required: true 
  },

  redirectUri: { 
    type: String, 
    required: true 
  },

  userId: { 
    type: String, 
    required: true 
  },

  clientId: { 
    type: String, 
    required: true 
  }

});

// Export the Mongoose model
module.exports = mongoose.model('Code', CodeSchema);