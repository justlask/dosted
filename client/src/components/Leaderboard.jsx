import React, { Component } from 'react'
import axios from 'axios'
import UserCard from '../components/profile/UserCard'
import Sidebar from '../components/Sidebar'

export default class Leaderboard extends Component {
  state = {
    leaderboard: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/user/leaderboard').then(response => {
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
          return <UserCard key={i} leader={leader}/>
        })}
        </div>
      </main>
    )
  }
}
