import React, { Component } from 'react'
import Button from '../Button'
import Sidebar from '../Sidebar'
import AuthService from '../auth/AuthService'

export default class LeaderProfile extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
  }


  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <main>
        <Sidebar />
        <div className="halfrow">
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={this.props.loggedInUser.image} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">@{this.props.loggedInUser.username}</h5>
                  <p className="card-text">{this.props.loggedInUser.bio}</p>
                  <p className="card-text"><small className="text-muted">Actions Completed: {this.props.loggedInUser.actionsCompleted}</small></p>
                  <p className="card-text"><small className="text-muted">Streak: {this.props.loggedInUser.currentStreak}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
