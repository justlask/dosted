import React, { Component } from 'react'
import Button from '../Button'
import Sidebar from '../Sidebar'
import AuthService from '../auth/AuthService'

export default class LeaderProfile extends Component {
  state = {
    friend: {}
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }


  componentDidMount() {
    this.service.getFriend(this.props.match.params.id)
    .then(data => 
      this.setState({
        friend: data
      })
      )
    .catch(err => console.log(err))
  }

  render() {
    return (
      <main>
        <Sidebar />
       {console.log(this.state.friend)}
      </main>
    )
  }
}
