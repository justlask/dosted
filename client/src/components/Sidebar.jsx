import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
  render() {
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
}
