import React, { Component } from 'react'
import axios from 'axios'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import serverUrl from '../../configServer'

export default class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
        bio: this.props.loggedInUser.bio,
        image: this.props.loggedInUser.image,
    };
    this.service = new AuthService();
  }

  handleDelete = (e) => {
    this.service.deleteProfile(this.props.loggedInUser._id)
    .then(() => {
        this.props.history.push('/')
      }
    )  
  }


changePassword = e => {
  e.preventDefault();
  console.log(this.state.password)
  this.service.changePassword(this.state.password)
  .then(response => {
    console.log(response)
    this.props.history.push('/profile')
  })
}

handleChange = e => {
  this.setState({
    password: e.target.value
  })
  console.log(this.state.password)
}


  render() {
    if (this.props.showmore) {
      return (
        <div className="card mb-3 profileImg">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={this.props.loggedInUser.image} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body flexy">
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button name="less options" onClick={this.props.handleShowMore}></Button>
                <Button name="cancel edit" onClick={this.props.show}></Button>
              </div>
            <form className="editform">
            <div>
            <label htmlFor="password">Update Password</label><br></br>
            <input type="text" placeholder="New Password" onChange={(e) => this.handleChange(e)}/>
            <input type="submit" value="submit" onClick={e => this.changePassword(e)}/>
            </div>
          </form>
            <Button className="submitbtn delete" onClick={this.handleDelete} name="Delete Account" />
            </div>
          </div>
        </div>
      </div>
      )
    }
    else {
      return null
    }
  }
}
