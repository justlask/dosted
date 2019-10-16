import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserCard extends Component {
  render() {
    return (
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={this.props.leader.image} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <Link to={`/leaderboard/profile/${this.props.leader._id}`}><h5 className="card-title">@{this.props.leader.username}</h5></Link>
                <p className="card-text">{this.props.leader.bio}</p>
                <p className="card-text"><small className="text-muted">Actions Completed: {this.props.leader.actionsCompleted}</small></p>
                <p className="card-text"><small className="text-muted">Streak: {this.props.leader.currentStreak}</small></p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
