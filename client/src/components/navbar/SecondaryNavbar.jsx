import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMedal, faUserFriends, faCommentAlt, faCalendarDay } from '@fortawesome/free-solid-svg-icons'

export default class SecondaryNavbar extends Component {

  componentDidMount() {
    let windowWidth = window.innerWidth
    console.log(windowWidth)
  }
  render() {

    if (window.innerWidth > 800) {
      return (
        <div className="sidebar">
          <Link to="/action">Today's DOST</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/suggestion">Suggest A DOST</Link>
        </div>
      )
    }
    else {
      return (
        <div className="sidebar">
          <Link to="/action"><FontAwesomeIcon style={{fontSize: '32px'}} icon={faCalendarDay} /></Link>
          <Link to="/profile"><FontAwesomeIcon style={{fontSize: '32px'}} icon={faUser} /></Link>
          <Link to="/leaderboard"><FontAwesomeIcon style={{fontSize: '32px'}} icon={faMedal} /></Link>
          <Link to="/friends"><FontAwesomeIcon style={{fontSize: '32px'}} icon={faUserFriends} /></Link>
          <Link to="/suggestion"><FontAwesomeIcon style={{fontSize: '32px'}} icon={faCommentAlt} /></Link>
        </div>
      )
    }
  }
}