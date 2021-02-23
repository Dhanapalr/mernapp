const mongoose=require('mongoose')
const config=require('config')

const URL=config.get("MongoDB_URL")
module.exports=()=>{
    console.log(URL)
//'mongodb://localhost:27017/cable_network'
mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err) return console.log('Database connection failed')
    console.log('Succesfully connected to Database')
})


}