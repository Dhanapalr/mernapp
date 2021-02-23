const router = require('express').Router()
const { User, validateUser } = require('../models/user')
const _ = require('lodash')
const config = require('config')
const auth =require('../middleware/auth')
const admin=require('../middleware/admin')



router.post('/register', async (req, res) => {

  try {
    const result = await validateUser({ ...req.body })
    if (result) req.body = result
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json('Email already exist')
    if (req.body.isAdmin) {

      if (!(req.body.masterpwd === config.get('m_pwd'))) { return res.status(403).send("Master password is invalid") }
    }
    const val = _.pick(req.body, ['name', 'email', 'password', 'isAdmin'])
    user = new User(val)
    await user.save()
    const token = await user.generateAuthToken()
    return res.header('X-AUTH-TOKEN', token).header("Access-Control-Expose-Headers", "X-AUTH-TOKEN").send(user)
  } catch (error) {
    if (error.errors)
      return res.status(400).send(error.errors)
    return res.status(400).send(error)
  }
})



router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    return res.header('X-AUTH-TOKEN', token).header("Access-Control-Expose-Headers", "X-AUTH-TOKEN").send(user)

  } catch (error) {
    console.log(error)
    res.status(400).send('Invalid Credentials')
  }

})

router.post('/logout', auth,async (req, res) => {
 try {
  req.user.tokens=req.user.tokens.filter(token=>{
    return token.token!==req.token
  })
  await req.user.save()
  res.status(200).send('loged out')
 } catch (error) {
   console.log(error)
        res.status(404).send('logout failed')
 }
  

})


router.get('/getuser', [auth,admin],async (req, res) => {
  try {
    const users= await User.find({})
    if(users) return res.status(200).send(users)
    return  res.status(200).send('No Users Found')
  } catch (error) {
         res.status(404).send('')
  }
   
 
 })












module.exports = router