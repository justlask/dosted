import React, { Component } from 'react'
import axios from 'axios'
import UserCard from '../components/profile/UserCard'
import Sidebar from '../components/Sidebar'
import serverUrl from '../configServer'

export default class Leaderboard extends Component {
  state = {
    leaderboard: []
  }

  componentDidMount(){
    axios.get(`${serverUrl}/user/leaderboard`).then(response => {
      this.setState({
        leaderboard: response.data
      })
    })
  }
  render() {
    return (
      <main>
        <Sidebar />
        <div className="halfrow">
        {this.state.leaderboard.map((leader, i) => {
          return <UserCard loggedInUser={this.props.loggedInUser} key={i} leader={leader}/>
        })}
        </div>
      </main>
    )
  }
}
