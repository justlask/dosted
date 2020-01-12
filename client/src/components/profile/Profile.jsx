import React, { Component } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import ActionCard from '../actions/ActionCard'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import EditCard from './EditCard'

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
    this.state = {
      loggedInUser: this.props.loggedInUser,
      show: false
    }
  }

  state = {
    loggedInUser: this.props.loggedInUser
  }

  componentDidMount(){
    this.service.getProfile()
    .then(response => {
      console.log("response =>>>" + response)
      this.setState({
        loggedInUser: response
      })

    }).catch(err => console.log(err))
  }

  pleaseChange = () => {
    this.service.getProfile()
    .then(response => {
      console.log("response =>>>" + response)
      this.setState({
        loggedInUser: response
      })

    }).catch(err => console.log(err))
  }

  getActions = () => {
    console.log(this.state.loggedInUser.actions)
    return this.state.loggedInUser.actions.map(action => {
      return <ActionCard action={action}/>
    })
  }


  handleProfileView = () => {
    if (this.state.show) {
      return (
        <EditCard loggedInUser={this.state.loggedInUser} pleaseChange={this.pleaseChange} handleShow={this.handleShow}/>
      )
    }
    else {
      return ( 
      <ProfileCard handleShow={this.handleShow} loggedInUser={this.state.loggedInUser}/>
      )
    }
  }

  handleShow = e => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <main>
        <div className="halfrow">
          {this.handleProfileView()}
          <div className="actioncard">
            <h2>Actions Completed:</h2>
            {this.getActions()}
          </div>


        </div>
      </main>
    )
  }
}
