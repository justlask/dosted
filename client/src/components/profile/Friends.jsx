import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import UserCard from '../profile/UserCard'
import axios from 'axios'
import serverUrl from '../../configServer'


export default class Friends extends Component {
  state = {
    friends: [],
    loggedInUser: this.props.loggedInUser
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  componentDidMount(){
    axios.get(`${serverUrl}/user/friends/${this.props.loggedInUser._id}`).then(response => {
      this.setState({
        friends: response.data.friends,
      })
    })
  }

  pleaseChange = (user) => {
    axios.get(`${serverUrl}/user/friends/${this.props.loggedInUser._id}`).then(response => {
      this.setState({
        friends: response.data.friends,
        loggedInUser: user
      })
    })
  }

  render() {
    return (
      <main>
        <div className="halfrow">
        {this.state.friends.map((friend, i) => {
          return <UserCard loggedInUser={this.state.loggedInUser} key={i} leader={friend} pleaseChange={this.pleaseChange}/>
        })}
        </div>
      </main>
    )
  }
}
