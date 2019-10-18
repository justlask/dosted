import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Sidebar from '../Sidebar'

export default class Profile extends Component {
  render() {
    return (
      <main>
        <div className="halfrow">
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
                </div>
              </div>
            </div>
          </div>
          <Button link="edit" name="Edit Profile"/>
        </div>
      </main>
    )
  }
}
