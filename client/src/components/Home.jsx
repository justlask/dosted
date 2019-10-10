import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

export default class Home extends Component {
  render() {
    return (
      <main>
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
      </main>
    )
  }
}
