'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    reviews = require('./review');


// Define the report schema
var ReportSchema   = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },

  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Please add more details to your report.'
  },

  creatorId: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  reviews: [reviews]

});

module.exports = mongoose.model('Report', ReportSchema);
