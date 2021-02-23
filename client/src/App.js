import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import Register from './components/Register'
import LoginForm from './components/login'
import Home from  './components/Home'
import NotFound from './components/not-found'
import Logout from './components/logout'
import { ToastContainer } from 'react-toastify'
import {Switch,Route,Redirect} from 'react-router-dom'
import React, { Component } from 'react';

import jwtDecode from 'jwt-decode';







class App extends Component {
  state = {
    user:{}
  }

  componentDidMount() {
    try {
      const token= localStorage.getItem('token')
      const decode= jwtDecode(token) ||{}
  this.setState({user:decode})
    } catch (error) {
      
    }
   

  }
  render() { 
    return ( <div className="App">
    <Navbar user={this.state.user}/>
    <ToastContainer />
     <main className="container" >
 <Switch>
  <Route path="/home" render={(props)=><Home  user={this.state.user} {...props}/>}></Route>
  <Route path="/register" component={Register}></Route>
  <Route path="/" exact={true} component={LoginForm}></Route>
  <Route path="/logout" component={Logout}></Route>
  <Route path="/not_found" component={NotFound}></Route>
   <Redirect to="/not_found"/>


 </Switch>
    </main >
   </div> );
  }
}
 
export default App;

