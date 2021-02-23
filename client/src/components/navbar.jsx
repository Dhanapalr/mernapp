import React, { Component } from 'react';

import {NavLink ,Link} from 'react-router-dom'



class Navbar extends Component {
    
    render() { 
        return ( 
             <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link  className="navbar-brand" to="/">Cable Network</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynavbar" aria-controls="mynavbar" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="mynavbar">
    <div className="navbar-nav">
      <NavLink className="nav-link " to="/home">Home</NavLink>
     
   {
       !this.props.user.name && <React.Fragment>
             <NavLink className="nav-link" to="/register">Register</NavLink>
         <NavLink className="nav-link" to="/">Login</NavLink> 
        </React.Fragment>
   }
   { 
      this.props.user.name &&<React.Fragment>
              <NavLink className="nav-link" to="/profile">{this.props.user.name}</NavLink>
      <NavLink className="nav-link" to="/logout">Logout</NavLink>
   
       </React.Fragment>
    }
     
    </div>
  </div>
</nav>
            
             
     </React.Fragment>
          

         );
    }
}
 
export default Navbar;