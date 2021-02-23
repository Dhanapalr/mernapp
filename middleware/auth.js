const jwt=require('jsonwebtoken')
const {User}=require('../models/user')
const config=require('config')



const auth=async(req,res,next)=>{

try {
    
    const token =req.header('x-auth-token')

    const decode=jwt.verify(token,config.get('jwtkey'))
    const user=await User.findOne({
        email:decode.email,
        "tokens.token":token})
if(!user)
throw new error()

req.user=user
req.token=token
next();

} catch (error) {
    res.status(404).send('please authenticate')
}



}


module.exports=auth;