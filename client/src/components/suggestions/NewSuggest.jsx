import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'


export default class NewSuggest extends Component {
  state = {
    title: ''
  }

  handleSuggestSubmit = e => {
    let title = this.state.title
    let userID = this.props.loggedInUser
    axios.post('http://localhost:5000/api/suggestions/new', {userID, title})
    .then(response => {
    }).catch(err => console.log(err))
    this.props.history.push('/')
  }

  handleSuggestChange = e => {
    console.log(e.target.value)
    this.setState({
      title: e.target.value
    })
  }
  render() {
    return (
      <main>
        <Sidebar />
        <div className="half">
        <p>MAKE A SUGGESTION FOR A DOST</p>
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">

          <label for="title"><b>What's one small thing that anyone could do to make the world a better place?</b></label><br></br>
          <input type="text" onChange={(e) => this.handleSuggestChange(e)} /> 
          <input type="submit" value="Submit" onSubmit={e => this.handleSuggestSubmit()} />
        </form>
        </div>
      </main>
    )
  }
}
