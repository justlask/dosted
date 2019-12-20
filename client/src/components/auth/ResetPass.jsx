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
       HEY! THIS WORKED~
      </div>
    )
  }
}


export default ResetPass;
