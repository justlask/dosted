import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import Sidebar from '../Sidebar'
import serverUrl from '../../configServer'

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

    axios.put(`${serverUrl}/user/profile/edit/${this.props.loggedInUser._id}`, { bio, image }, {withCredentials:true})
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
    console.log(this.props)
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
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data" className="editform">
          <div>
          <label for="photo"><b>Profile Picture</b></label><br></br>
          <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 
          </div>
          <div>
          <label><b>Bio</b></label><br></br>
          <textarea name="bio" className="bio" value={this.state.bio} onChange={ e => this.handleChangeBio(e)} />
          </div>
          <Button className="submitbtn" name="submit" onClick={e => this.handleFormSubmit()} />
        </form>

          <Button className="submitbtn delete" onClick={this.handleDelete} name="Delete Account" />

    </main>
    )
  }
}
