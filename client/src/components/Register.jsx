import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik,Field,ErrorMessage, Form} from 'formik'
import React, { useState } from 'react';

import * as yup from 'yup'


const initialvalues={
    name:'',
    email:'',
    password:'',
    confirmpwd:'',
    isAdmin:false,
    masterpwd:'',

}
const onSubmit =(async (values,props)=>{
  
   try {
     const data= await axios.post('/api/user/register',{...values})
 
     localStorage.setItem('token',data.headers['x-auth-token'])
     if(data.status==200) toast.success('Registered Successfully')
    window.location="/home"
   
   } catch (ex) {
    
     if(ex.response.status==403)
        return toast.error(ex.response.data)

       props.setFieldError('email',ex.response.data)
      
      
   }
     
    
})

const validationSchema=yup.object({
 name:yup.string().required(),
 email:yup.string().email().required(),
 password:yup.string().min(5).max(8).required(),
 confirmpwd:yup.string().required().oneOf([yup.ref('password')],"password must be same"),
 isAdmin:yup.boolean().default(false),
 masterpwd:yup.string().when('isAdmin',{
   is:true,
   then: yup.string().required(),
  
 })


})

const Register = () => {
    return(
        
        <Formik enableReinitialize={true} isInitialValid={false}  initialValues={initialvalues} onSubmit={onSubmit} validationSchema={validationSchema}>
  {formik=>{
  return        <Form>
  <div className="form-group row m-2">
<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
<div className="col-sm-10">
<Field name="name" className="form-control" type="text" />
<ErrorMessage name="name" >{msg=>{
return <div className="alert alert-danger m-1">{msg}</div>
}}</ErrorMessage>
</div>

</div>

<div className="form-group row m-2">
<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
<div className="col-sm-10">
<Field name="email" className="form-control" type="email" />
<ErrorMessage name="email" >{msg=>{
return <div className="alert alert-danger m-1">{msg}</div>
}}</ErrorMessage>
</div>

</div>

<div className="form-group row m-2">
<label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
<div className="col-sm-10">
<Field name="password" className="form-control" type="password" />
<ErrorMessage name="password"  >{msg=>{
return <div className="alert alert-danger m-1">{msg}</div>
}}</ErrorMessage>
</div>
</div>




<div className="form-group row m-2">
<label htmlFor="confirmpwd" className="col-sm-2 col-form-label">Confirm Password</label>
<div className="col-sm-10">
<Field name="confirmpwd" className="form-control" type="password" />
<ErrorMessage name="confirmpwd">{msg=>{
return <div className="alert alert-danger m-1">{msg}</div>
}}</ErrorMessage>
</div>



<div className="form-group row m-2">
{/*<label htmlFor="isAdmin" className="col-sm-2 col-form-label"></label>*/}
<div className="col-sm-2"></div>
<div className="col-sm-10">
<Field name="isAdmin" className="form-control"  >

  {
    ({field})=>{ 
    return <div className="custom-control custom-switch">
      <input type="checkbox" name="isAdmin" id="isAdmin" className="custom-control-input" onClick={()=>formik.values.isAdmin?null:formik.setFieldValue('masterpwd','')} {...field}/>
      <label className="custom-control-label" htmlFor="isAdmin">Make Admin</label>
    </div>
    }
   
  }
</Field>

</div>
</div>

</div>

{formik.values.isAdmin&& <div className="form-group row m-2">
<label htmlFor="masterpwd" className="col-sm-2 col-form-label">Master Password</label>
<div className="col-sm-10">
<Field name="masterpwd" className="form-control" type="text"  />
<ErrorMessage name="masterpwd">{msg=>{
return <div className="alert alert-danger m-1">{msg}</div>
}}</ErrorMessage>
</div>

</div>}




<div className="form-group ">

<button className="btn btn-sm btn-primary " disabled={!formik.isValid}>Register</button>
</div>




</Form>



  }







  }

     
        </Formik>

   
        
    )
       
    


    

}
 
export default Register;