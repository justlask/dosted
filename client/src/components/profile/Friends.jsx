import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import UserCard from '../profile/UserCard'
import Sidebar from '../Sidebar'
import axios from 'axios'


export default class Friends extends Component {
  state = {
    friends: []
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  // componentDidMount() {
  //   this.service.findFriends(this.props.loggedInUser._id)
  //   .then(data => this.setState({
  //     friends: data
  //   }))
  // }
  componentDidMount(){
    axios.get(`/api/user/friends/${this.props.loggedInUser._id}`).then(response => {
      this.setState({
        friends: response.data.friends
      })
    })
  }

  render() {
    return (
      <main>
        <Sidebar />
        <div className="halfrow">
        {this.state.friends.map((friend, i) => {
          return <UserCard loggedInUser={this.props.loggedInUser} key={i} leader={friend}/>
        })}
        </div>
      </main>
    )
  }
}
