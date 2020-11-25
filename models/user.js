const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('password cannot includes "password"')
      }
    }
  },
});


module.exports = mongoose.model('User', UserSchema);