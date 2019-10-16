
import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

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
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
          
          <input className="submitbtn" type="submit" value="Signup" />
        </form>

        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>

    </div>
    )
  }
}

export default Signup;