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
        bio: this.props.loggedInUser.bio,
        image: this.props.loggedInUser.image
    };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    const image = this.state.image;
    const bio = this.state.bio;
    event.preventDefault()

    axios.put(`http://localhost:5000/api/user/profile/edit/${this.props.loggedInUser._id}`, { bio, image }, {withCredentials:true})
    .then( () => {
        this.setState({
          bio: this.state.bio,
          image: this.state.image
        })
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

// this method handles just the file upload
handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    this.service.handleUpload(uploadData)
    .then(response => {
        this.setState({ image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}



  render() {
    return (
      <main>
        <Sidebar />
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
          <p>THIS IS WHERE YOU EDIT YOUR PROFILE</p>
          <label for="photo"><b>profile picture</b></label>
          <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 
          <label>Bio:</label>
          <textarea name="bio" value={this.state.bio} onChange={ e => this.handleChangeBio(e)} />
          <input type="submit" value="Submit" onSubmit={e => this.handleFormSubmit()} />
        </form>

        <form onClick={this.handleDelete}>
          <Button name="Delete Account" />
        </form>

    </main>
    )
  }
}
