const mongoose =require('mongoose')

const yup =require('yup')

require('yup-phone')

const customerSchema= new mongoose.Schema({

   name:{
       type:String,
       required:true
   } ,
   cable_Id:{
       type:String,
       required:true,
       unique:true,
       minLength:5,
       maxLength:8
   },
   mob_no:{
       type:Number,
       min:10,
       required:true
   },
   address:{
       type:String,
       
   },
   price:{
       type:Number,
       required:true
   },

   due_date:{
       type:Date,
       required:true
   },

   paid:{
       type:Boolean,

   }

   

})




const Customer=mongoose.model('Customer',customerSchema)

const schema=yup.object({
    name:yup.string().required(),
    cable_Id:yup.string().required().trim().min(5),
    mob_no:yup.string().phone("IN", true).required(),
    address:yup.string(),
    due_date:yup.date().required(),
    price:yup.number().min(100).max(400).required(),
    paid:yup.boolean()
})

function validateCustomer (customer)
{
    
 

     return  schema.validate(customer,{abortEarly:false})

}


function validateUpdates(keys,data){
  
    //var object = Object.assign({}, ...Object.entries({...keys}).map(([a,b]) => ({ [b]: 'someValue' })))

let s1= Object.assign({},...Object.entries(keys).map(([a,b])=>({[b]:schema.fields[b]})))

console.log("updateSchema",s1)
const updateSchema=yup.object({...s1})


return updateSchema.validate(data,{abortEarly:false})



}






module.exports={

    Customer,
    validateCustomer,
    validateUpdates,
}





