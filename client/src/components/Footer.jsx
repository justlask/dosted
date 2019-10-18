import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthService from './auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Made with <FontAwesomeIcon icon={faHeart} className="red"/> by <a href="http://www.justlask.com">Just Lask</a></p>
      </footer>
    )
  }
}
