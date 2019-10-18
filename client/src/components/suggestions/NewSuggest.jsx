import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import serverUrl from '../../configServer'


export default class NewSuggest extends Component {
  state = {
    title: ''
  }

  handleSuggestSubmit = (e) => {
    e.preventDefault();
    let title = this.state.title
    let userID = this.props.loggedInUser
    axios.post(`${serverUrl}/suggestions/new`, {userID, title})
    .then(response => {
    }).catch(err => console.log(err))
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
