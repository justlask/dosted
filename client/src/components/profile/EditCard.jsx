import React, { Component } from 'react'
import axios from 'axios'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import EditProfile from './EditProfile'

export default class EditCard extends Component {
  constructor(props){
    super(props);
    this.state = {
        bio: this.props.loggedInUser.bio,
        image: this.props.loggedInUser.image,
        showmore: false
    };
    this.service = new AuthService();
  }

  handleFormSubmit = () => {
    const image = this.state.image;
    const bio = this.state.bio;


    this.service.editProfile(bio, image)
    .then(response => {
      this.props.pleaseChange();
      this.props.handleShow();

    })
  }

  handleChangeBio = (event) => {  
    this.setState({
      bio:event.target.value
    })
  }
  
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

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    })
  }

  render() {
    if (this.state.showmore) {
      return (
        <EditProfile loggedInUser={this.props.loggedInUser} show={this.props.handleShow} showmore={this.state.showmore} handleShowMore={this.handleShowMore}/>
      )
    }
    else {
      return (
        <div className="card mb-3 profileImg">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={this.props.loggedInUser.image} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body flexy">
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button name="more options" onClick={this.handleShowMore}></Button>
                <Button name="cancel edit" onClick={this.props.handleShow}></Button>
              </div>
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
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}
