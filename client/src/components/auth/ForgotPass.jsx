import React, { Component } from 'react'
import AuthService from './AuthService'
import { Link, Redirect } from 'react-router-dom'



class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      sent: false
    }
    this.service = new AuthService();
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.service.resetPass(this.state.email)
    .then(data => {
      this.setState({sent: true})
      console.log('data is ' + data)
    })
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.sent) {
      return (
        <div>
          <h1>Check your email for your temporary password!</h1>
        </div>
      )
    }
    else {
      return (
        <div className="flexcolfull">
          Forgot Your Password?
          <form onSubmit={this.handleSubmit} className="">
            <label htmlFor="email">email</label>
            <input type="email" name="email" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
            <input type="submit" value="submit" className="submitbtn" />
          </form>
        </div>
      )
    }
  }
}

export default ForgotPassword;