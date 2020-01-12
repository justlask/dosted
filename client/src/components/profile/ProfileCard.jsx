import React, { Component } from 'react'
import Button from '../Button'

export default class ProfileCard extends Component {
  render() {
    return (
      <div className="card mb-3 profileImg">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={this.props.loggedInUser.image} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body flexy">
            
            <h5 className="card-title">@{this.props.loggedInUser.username}</h5>
            <p className="card-text">{this.props.loggedInUser.bio}</p>
            <p className="card-text"><small className="text-muted">Actions Completed: {this.props.loggedInUser.actionsCompleted}</small></p>
            <p className="card-text"><small className="text-muted">Streak: {this.props.loggedInUser.currentStreak}</small></p>
            <Button name="editprofile" onClick={this.props.handleShow}></Button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
