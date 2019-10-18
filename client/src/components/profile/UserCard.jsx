import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faLayersCounter } from '@fortawesome/free-solid-svg-icons'

export default class UserCard extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  addFriend(e) {
    let userID = this.props.loggedInUser._id
    let friendID = this.props.leader._id
    this.service.follow(userID, friendID)
    .then(response => {
      console.log(response)
      //need to refresh this card to show unfollow!!!
      this.props.pleaseChange(response)
    }).catch(err => console.log(err))
  }

  removeFriend(e) {
    let userID = this.props.loggedInUser._id
    let friendID = this.props.leader._id
    this.service.unfollow(userID, friendID)
    .then(response => {
      console.log(response)
      this.props.pleaseChange(response)
      //need to refresh this card to show unfollow!!!
    }).catch(err => console.log(err))
  }


  handleButton = () => {
    console.log(this.props)
    // return <Button onClick={this.toggleFriend} name="Follow" />
    if (this.props.loggedInUser._id === this.props.leader._id) {
      return
    }
    if (this.props.loggedInUser.friends.includes(this.props.leader._id)) {
      return <Button onClick={(e) => this.removeFriend(e)} name="unfollow" />
    }
    else {
      return <Button onClick={(e) => this.addFriend(e)} name="follow" />
    }
  }


  render() {
    return (
        <div className="card mb-3 max-width">
          <div className="row no-gutters">
            <div className="col-md-4 fleximg">
              <img src={this.props.leader.image} className="card-img thumb" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body flexy">
                <div className="icons">
                  <span className="fa-layers fa-fw flexy">
                    <FontAwesomeIcon icon={faStar} className="star"/>
                    <span className="fa-layers streak"><b>{this.props.leader.currentStreak}</b></span>
                  </span>
                </div>
                <Link to={`/profile/${this.props.leader._id}`} ><h5 className="card-title">@{this.props.leader.username}</h5></Link>
                <p className="card-text">{this.props.leader.bio}</p>
                <p className="card-text"><small className="text-muted">Actions Completed: {this.props.leader.actionsCompleted}</small></p>
                {this.handleButton()}
              </div>
            </div>
          </div>
        </div>
    )
  }
}
