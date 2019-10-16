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
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src={this.props.loggedInUser.image} class="card-img" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">@{this.props.loggedInUser.username}</h5>
                  <p class="card-text">{this.props.loggedInUser.bio}</p>
                  <p className="card-text"><small class="text-muted">Actions Completed: {this.props.loggedInUser.actionsCompleted}</small></p>
                  <p class="card-text"><small class="text-muted">Streak: {this.props.loggedInUser.currentStreak}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
