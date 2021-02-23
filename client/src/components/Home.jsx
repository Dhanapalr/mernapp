import React, { Component } from 'react';


const Home = (props) => {
    return ( 

      <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://crud-app-d.herokuapp.com" allowfullscreen></iframe>
</div>
  
     /* <h1>Welcome  {props.user.name? "Developer "+props.user.name:"User"}</h1>*/)
      
}
 
export default Home;