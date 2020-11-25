const express = require('express')
const router = express.Router()
const {addUser, checkUser, generateAuthToken} = require('../controllers/user')
const userModel = require('../models/user')


router.post('/signup', async (req, res) => {
  try {
    await addUser(req.body)
    res.status(200).send('OK!')
  } catch (error) {
    res.status(404).send(error)
  }
})

router.post('/signin', async (req, res)=>{
  try {
    const user = await checkUser(req.body.email, req.body.password)
    const token = generateAuthToken(user)
    res.json({user, token})
  } catch (error) {
    console.log('error', error)
    res.status(404).send(error)
  }
})

module.exports = router