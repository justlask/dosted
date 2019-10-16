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
    console.log(event.target)
    event.preventDefault()

    axios.put(`http://localhost:5000/api/user/profile/edit/${this.props.loggedInUser._id}`, { bio, image }, {withCredentials:true})
    .then( () => {
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

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot()
  //   console.log(imageSrc)
  //   axios
  //     .post(
  //         'http://localhost:5000/api/image-upload',
  //       { imageSrc }
  //     )
  //     }


      // handleImage(e){
      //   console.log(e.target.imageSrc)
      //   this.setState({
      //     image: e.target.imageSrc
      //   })
      // }




  handleFileSelect(e) {
    var files = e.target.files; // FileList object
    console.log(files)

    this.setState({
      image: e.target.files[0]
    })

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    console.log(this.state)
  }

  render() {
    return (
      <main>
        <Sidebar />
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
          <p>THIS IS WHERE YOU EDIT YOUR PROFILE</p>
          <label for="photo"><b>profile picture</b></label>
          <input type="file" id="file" name="files[]" onChange={e => this.handleFileSelect(e)} />
          <output id="list"></output>
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
