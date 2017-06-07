const mongoose = require('mongoose');
const validator = require('validator');


const model = mongoose.model('Fuck', {
  From: {
    type: String,
    required: true,
    validate: {
      validator(from) {
        return validator.isAlphanumeric(from);
      },
    },
  },
  To: {
    type: String,
    required: true,
    validate: {
      validator(to) {
        return validator.isAlphanumeric(to);
      },
    },
  },
  Message: {
    type: String,
    required: false
  },
  Slug: {
    type: String,
    required: true,
  },
  Time: {
    type: Number,
    required: false,
  },
  Timestamp: {
    type:String,
    required: false,
  },
  views: {
    type:Number,
    required: false,
  },
});

module.exports = model;
