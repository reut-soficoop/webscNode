const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function addUser(newUser) {
  const user = new userModel(newUser)
  try {
    return await user.save()
  } catch (error) {
    console.log('error', error)
    throw new Error('cant save user')
  }
}

async function checkUser(email, password) {
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error('Unable to login, cannot find user with this email')
    }
  
    const isMatch = await bcrypt.compare(password, user.password)
  
    if (!isMatch) {
        throw new Error('Unable to login')
    }
  
    return user
  } catch (error) {
    throw new Error(error)
  }
}

function generateAuthToken(user){
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')
  return token
}

module.exports = {addUser, checkUser, generateAuthToken}