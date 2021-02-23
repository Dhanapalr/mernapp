import React, { Component } from 'react';


const Home = (props) => {
    return ( 

      <h1>Welcome  {props.user.name? "Developer "+props.user.name:"User"}</h1>)
      
}
 
export default Home;