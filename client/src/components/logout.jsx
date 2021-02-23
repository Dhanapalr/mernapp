import axios from 'axios'
import React, { Component } from 'react';
import {toast, Toast}from 'react-toastify'






class Logout extends Component {

   async componentDidMount(props){
    
        try {
           if(await window.confirm("do you want to Logout ")){
          const token=  localStorage.getItem('token')
          const data=await axios.post('/api/user/logout',{},{headers:{
              "x-auth-token":token
          }}
        )
         if(data.status===200) localStorage.removeItem('token')
          window.location="/"}
          else{
            window.location="/home"
          }
        } catch (error) {
             console.log(error)
             toast.error('logout failed')
             console.log(props)
        }
      
      
    }
    render() { 
        return null;
    }
}
 
export default Logout;