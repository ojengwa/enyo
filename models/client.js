
'use strict';

// Load required packages
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our client schema
var ClientSchema = new Schema({

  name: { 
    type: String,
    unique: true, 
    required: true 
  },
  id: { 
    type: String, 
    required: true 
  },
  secret: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: String, 
    required: true 
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema);