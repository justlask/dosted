import React, { Component } from 'react'
import AuthService from './AuthService'
import { Link, Redirect } from 'react-router-dom'

class ResetPass extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.service = new AuthService();
  }




  render() {
    return (
      <div className="flexcolfull">
        Forgot Your Password?
      </div>
    )
  }
}


export default ResetPass;
