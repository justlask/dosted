import React, { Component } from 'react'
import UserCard from '../components/profile/UserCard'
import AuthService from './auth/AuthService'

export default class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();

    this.state = {
      leaderboard: [],
      loggedInUser: this.props.loggedInUser
    }
  }


  componentDidMount(){
    this.service.getLeaderBoard()
    .then(response => {
      this.setState({
        leaderboard: response,
      })
    })
  }

  updateUser = (user) => {
    this.service.getLeaderBoard()
    .then(response => {
      this.setState({
        leaderboard: response,
        loggedInUser: user
      })
    })
  }

  render() {
    return (
      <main>
        <div className="halfrow">
        {this.state.leaderboard.map((leader, i) => {
          return <UserCard loggedInUser={this.state.loggedInUser} key={i} leader={leader} updateUser={this.updateUser} />
        })}
        </div>
      </main>
    )
  }
}
