const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcrypt')

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


const userModel = mongoose.model('User', UserSchema);
module.exports = userModel

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await userModel.findOne({ email })
  if (!user) {
      throw new Error('Unable to login, cannot find user with this email')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}

UserSchema.methods.generateAuthToken = async function () {

}



