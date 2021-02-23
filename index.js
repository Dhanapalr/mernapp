
const cors=require('cors')
const customer=require('./routes/customer')
const user=require('./routes/user')
const express = require('express')
const app=express();
app.use(express.json())
require('./startup/check')();
require('./startup/db')();
app.use(cors())
app.use('/api/user',user)
app.use('/api/customer',customer)






if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
  }




const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
console.log("connected to server")

})
