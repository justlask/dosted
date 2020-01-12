
import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

  
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(response)
        this.props.history.push('/action')

    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
      return(
        // more code will be added here
        <div className="flexcolfull">
          <form onSubmit={this.handleFormSubmit} className="signup-login">
          <div>
          <label  className="icons"><FontAwesomeIcon icon={faUser} /></label>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
          </div>
            
            <div>
            <label  className="icons"><FontAwesomeIcon icon={faLock} /></label>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
            </div>
            <input className="submitbtn" type="submit" value="Signup" />
          </form>

          <p>Already have account? 
              <Link to={"/login"}> Login</Link><br></br>
              <Link to={"/forgot"}>Forgot Password?</Link>
          </p>

      </div>
      )
    } 
}

export default Signup;