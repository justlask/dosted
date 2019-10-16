import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import Sidebar from '../Sidebar'

export default class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
        bio: ''
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    console.log(this.state)
    console.log(this.props)
  }


  handleFormSubmit = (event) => {
    const image = this.state.image;
    const bio = this.state.bio;
    console.log(event.target)
    event.preventDefault()

    axios.put(`http://localhost:5000/api/user/profile/edit/${this.props.loggedInUser._id}`, { bio, image }, {withCredentials:true})
    .then( () => {
        // after submitting the form, redirect to '/projects'
        this.props.history.push('/profile');    
    })
    .catch( error => console.log(error) )
  }
  handleChangeBio = (event) => {  
    this.setState({
      bio:event.target.value
    })
  }
  handleDelete = (e) => {
    this.service.deleteProfile(this.props.loggedInUser._id)
    .then(() => {
        this.props.history.push('/')
      }
    )  
  }

  render() {
    return (
      <main>
        <Sidebar />
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
          <p>THIS IS WHERE YOU EDIT YOUR PROFILE</p>
          <label for="photo"><b>profile picture</b></label>
            <input type="file" name="photo" />
          <label>Bio:</label>
          <textarea name="bio" value={this.state.bio} onChange={ e => this.handleChangeBio(e)} />
          
          <input type="submit" value="Submit" />
        </form>

        <form onClick={this.handleDelete}>
          <Button name="Delete Account" />
        </form>

    </main>
    )
  }
}
