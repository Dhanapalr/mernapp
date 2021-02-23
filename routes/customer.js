const route=require('express').Router();
const {Customer,validateCustomer,validateUpdates}=require('../models/customer');
const admin=require('../middleware/admin')
const auth=require('../middleware/auth');
const { Schema } = require('mongoose');




route.post('/add',[auth,admin],async(req,res)=>{

    try {
        const data=await validateCustomer({...req.body})
      if(data) req.body=data
      let customer=await Customer.findOne({cable_Id:data.cable_Id})
      if( customer) return res.status(400).send('Cable ID Already Exist')
       customer= new Customer({...req.body}) 
      await customer.save()

      return res.status(201).send(customer)

    } catch (error) {
    if(error.errors) return  res.status(400).send(error.errors)
    return  res.status(400).send(error)
    }
    
})


route.get('/getCustomers',[auth],async(req,res)=>{

try {
    const customers=await Customer.find({})
    if(customers) return res.status(200).send(customers)
    return res.status(200).send('No Customers')
} catch (error) {
    res.status(400).send('fetching Customers Failed')
}



})

route.get('/getCustomer/:id',[auth],async(req,res)=>{

    try {
      console.log( req.params.id)
     const customer=await Customer.findOne({ cable_Id:req.params.id})
         if(customer) return res.status(200).send(customer)
       return res.status(404).send('No Customer')
    } catch (error) {
        res.status(400).send('fetching Customer Failed')
    }
})


route.patch('/updateCustomer/:id',[auth,admin],async(req,res)=>{
           try {
            const updates=Object.keys(req.body)
            const data =await validateUpdates(updates,req.body)
            const cable_Id=req.params.id    
            const customer= await Customer.findOne({cable_Id})
            if(!customer) return res.status(400).send('Customer not found')
            const validUpdates=['name',"price",'mob_no','address','due_date']
            const isvalid= updates.every(update=>validUpdates.includes(update))
            if(!isvalid) return res.status(400).send('Invalid Update')
              
            updates.map(update=>{
                customer[update]=data[update]
            })
            await customer.save()
            return res.status(200).send('Updated Succesfully')


           } catch (error) {
             if(error.errors) return  res.status(400).send(error.errors)
              return  res.status(400).send('Update Failed')
           }

})








module.exports=route