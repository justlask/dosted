import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import UserCard from '../profile/UserCard'


export default class Friends extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
    this.state = {
      friends: [],
      loggedInUser: this.props.loggedInUser
    }
  }

  componentDidMount(){
    this.service.findFriends(this.props.loggedInUser._id)
    .then(response => {
      this.setState({
        friends: response.friends
      })
    })
  }

  updateUser = (user) => {
    this.service.findFriends(this.props.loggedInUser._id)
    .then(response => {
      this.setState({
        friends: response.friends,
        loggedInUser: user
      })
    })
  }

  render() {
    return (
      <main>
        <div className="halfrow">
        {this.state.friends.map((friend, i) => {
          return <UserCard loggedInUser={this.state.loggedInUser} key={i} leader={friend} updateUser={this.updateUser}/>
        })}
        </div>
      </main>
    )
  }
}
