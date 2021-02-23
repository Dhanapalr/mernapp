const config=require('config')
const mongoose=require('mongoose')
const yup=require('yup')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const _=require('lodash')


const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
    minLength:2
},
email:{
type:String,
required:true,
unique:true
},

password:{
    type:String,
    required:true
},

isAdmin:{
    type:Boolean,
    default:false
},


tokens:[{
    token:{
        type:String
    }
}]


})
userSchema.methods.toJSON= function(){
    let user=this
    
  let userobject= _.pick(user,['name','email'])
    
return userobject


}



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid Password')
    }

    return user
}





userSchema.pre('save',async function (next){
const user=this
if(user.isModified('password')){
     user.password=await bcrypt.hash(user.password,10)
    }
next()
})


userSchema.methods.generateAuthToken= async function(){
   const user=this
  const token=jwt.sign({name:user.name,email:user.email,isAdmin:user.isAdmin},config.get('jwtkey'))
user.tokens=user.tokens.concat({token})
await user.save()
return token


}



const User= mongoose.model('User',userSchema)




function validateUser(user) {
    const schema=yup.object().shape({
       name:yup.string().required().trim(),
       email:yup.string().email().required().lowercase().trim(),
       password:yup.string().required().min(5).max(8),
       confirmpwd:yup.string().required().oneOf([yup.ref('password')],'Passwords must be same'),
       isAdmin:yup.boolean().default(false).required(),
       masterpwd:yup.string().when('isAdmin',{is:true,then:yup.string().required()})

    })

  return schema.validate(user,{
      abortEarly:false
  })
   
    
}



module.exports={
    User,
    validateUser
}
