import React, { Component } from 'react'
import axios from 'axios'
import UserCard from '../components/profile/UserCard'
import Sidebar from '../components/Sidebar'
import serverUrl from '../configServer'

export default class Leaderboard extends Component {
  state = {
    leaderboard: [],
    change: false,
    loggedInUser: this.props.loggedInUser
  }

  componentDidMount(){
    axios.get(`${serverUrl}/user/leaderboard`).then(response => {
      this.setState({
        leaderboard: response.data
      })
    })
  }

  pleaseChange = (newUser) => {
    console.log(newUser, '[][][][')
    this.setState({
      change: !this.state.change,
      loggedInUser: newUser
    })
  }

  render() {
    return (
      <main>
        <Sidebar />
        <div className="halfrow">
        {this.state.leaderboard.map((leader, i) => {
          console.log(i, this.state.loggedInUser.friends)
          return <UserCard loggedInUser={this.state.loggedInUser} key={i} leader={leader} pleaseChange={this.pleaseChange} changed={this.state.change}/>
        })}
        </div>
      </main>
    )
  }
}
