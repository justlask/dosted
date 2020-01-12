import React, { Component } from 'react'
import axios from 'axios'
import serverUrl from '../../configServer'


export default class NewSuggest extends Component {
  state = {
    title: '',
    submitted: false
  }

  handleSuggestSubmit = (e) => {
    e.preventDefault();
    let title = this.state.title
    let userID = this.props.loggedInUser
    axios.post(`${serverUrl}/suggestions/new`, {userID, title})
    .then(response => {
      this.setState({
        submitted: true
      })
    }).catch(err => console.log(err))
  }

  handleSuggestChange = e => {
    this.setState({
      title: e.target.value
    })
  }
  render() {
    if (this.state.submitted) {
      return (
        <main>
          <div className="half">
            <h1>You have submitted a suggestion, thank you, our admin will edit and approve your suggestion!</h1>
          </div>
        </main>
      )
    }
    else {
      return (
        <main>
          <div className="half">
          <form onSubmit={(e) => this.handleSuggestSubmit(e)} className="darkblue">
  
            <label for="title"><b>What's one small thing that anyone could do to make the world a better place?</b></label><br></br>
            <input type="text" onChange={(e) => this.handleSuggestChange(e)} /> 
            <input type="submit" value="Submit" />
          </form>
          </div>
        </main>
      )
    }
  }
}
