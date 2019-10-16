import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  componentDidMount() {
    console.log("THIS PROPSSSS +>>>>>>>" + this.props)
    console.log("THIS STATEEEEEE +>>>>>>>>" + this.state)
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        console.log(response)
        this.setState({ username: "", password: "" });
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
    console.log(this.state)
    if(this.state.loggedInUser){
      return(
        <Redirect to="/actions" />
      )
    } else {
      return ( 
          <div className="flexcolfull">
            <form onSubmit={this.handleFormSubmit} className="signup-login">
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
                    
                <input type="submit" value="Login" className="submitbtn" />
                </form>
                <p>Don't have account? 
                    <Link to={"/signup"}> Signup</Link>
                </p>
            </div> 
      )
    }
  }
}

export default Login;