import {Formik,Form,ErrorMessage,Field} from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import {Link, Redirect} from 'react-router-dom'


const initialValues={
    email:'',
    password:''
}


const validationSchema= yup.object({
email:yup.string().required().email(),
password:yup.string().min(5).max(8).required()

})


const onsubmit= async(values,props)=>{

    try {
    
      const data=  await axios.post('/api/user/login',values)
      localStorage.setItem('token',data.headers['x-auth-token'])
     window.location.href="/home"
    } catch (ex) {
        props.setFieldError('email',ex.response.data)
    }


}


const LoginForm = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onsubmit}>
    {
        (formik)=>{return        <Form>
               
            <div className="form-group m-2">
                <label htmlFor="email">Email</label>
                <Field name="email" className="form-control" />
                <ErrorMessage name="email">{msg=><div className="alert alert-danger">{msg}</div>}</ErrorMessage>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password"  className="form-control"/>
                <ErrorMessage name="password">{msg=><div className="alert alert-danger">{msg}</div>}</ErrorMessage>
 </div>
 
          <button className="btn-primary">Login</button>{"    "}
          { <Link to="/register" className="stretched-link text-danger"> New User ?</Link>}
           
            </Form>}
           
    }




        </Formik>
        

     );
}
 
export default LoginForm;