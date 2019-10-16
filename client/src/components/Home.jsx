import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/AuthService';
import Button from './Button'
import Sidebar from './Sidebar'

export default class Home extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.user)
    if (this.props.user === undefined) {
      return (
        <div className="flexcolfull">
          <div className="titleName">
            <h1>
              Do<br></br>
              One<br></br>
              Small<br></br>
              Thing<br></br>
              Every<br></br>
              Day<br></br>
            </h1>
          </div>
          <div className="buttons">
            <Button name="Signup" link="/signup"/>
            <Button name="Login" link="/login" />
          </div>
        </div>
      )
    }
    else {
      return (
        <main>
          <Sidebar />
          <div className="halfrow">
            <h1>
              Do<br></br>
              One<br></br>
              Small<br></br>
              Thing<br></br>
              Every<br></br>
              Day<br></br>
            </h1>
          </div>
        </main>
      )
    }
  }
}
