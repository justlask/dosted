import React, { Component } from 'react'
import AuthService from './AuthService'
import { Link, Redirect } from 'react-router-dom'



class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.service = new AuthService();
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.service.resetPass({email: this.state.email})
    .then(data => {
      console.log(data)
    })
  }

  render() {
    return (
      <div className="flexcolfull">
        Forgot Your Password?
        <form onSubmit={this.handleSubmit} className="">
          <label htmlFor="email">email</label>
          <input type="text" name="email" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
          <input type="submit" value="submit" className="submitbtn" />
        </form>
      </div>
    )
  }


}

export default ForgotPassword;