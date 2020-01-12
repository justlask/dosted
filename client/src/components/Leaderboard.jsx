import React, { Component } from 'react'
import axios from 'axios'
import UserCard from '../components/profile/UserCard'
import serverUrl from '../configServer'

export default class Leaderboard extends Component {
  state = {
    leaderboard: [],
    loggedInUser: this.props.loggedInUser
  }

  componentDidMount(){
    axios.get(`${serverUrl}/user/leaderboard`).then(response => {
      this.setState({
        leaderboard: response.data,
      })
    })
  }

  pleaseChange = (user) => {
    axios.get(`${serverUrl}/user/leaderboard`).then(response => {
      this.setState({
        leaderboard: response.data,
        loggedInUser: user
      })
    })
  }

  render() {
    return (
      <main>
        <div className="halfrow">
        {this.state.leaderboard.map((leader, i) => {
          console.log(i, this.state.loggedInUser.friends)
          return <UserCard loggedInUser={this.state.loggedInUser} key={i} leader={leader} pleaseChange={this.pleaseChange} />
        })}
        </div>
      </main>
    )
  }
}
