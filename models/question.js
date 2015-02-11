'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;


var questionSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank'
  },

  category: {
    type: [{
      type: String,
      enum: ['company', 'group', 'person']
    }],

    default: ['group']
  },

  user: {
    type: ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Question', questionSchema);