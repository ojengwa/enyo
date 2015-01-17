'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var reviewSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank'
  },

  content: {
    type: String,
    default: '',
    trim: true
  },

  reviewer: {
    type: ObjectId,
    ref: 'User'
  },
  
  reviewee: {
    type: ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Review', reviewSchema);