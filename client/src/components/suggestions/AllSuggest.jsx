import React, { Component } from 'react'
import NewSuggest from '../suggestions/NewSuggest'
import axios from 'axios'
import SingleSuggest from '../suggestions/SingleSuggest'
import serverUrl from '../../configServer'

export default class AllSuggest extends Component {
  state = {
    suggestions: []
  }

  checkAdmin = () => {
    let user = this.props.loggedInUser
    if (this.props.loggedInUser.isAdmin) {
      axios.get(`${serverUrl}/suggestions/all`, {user})
      .then(response => {
        this.setState({
          suggestions: response.data
        })
      }).catch(err => console.log(err))
    }
    else {

    }
  }

  componentDidMount() {
    this.checkAdmin()
  }

  renderSuggests() {
    console.log(this.state.suggestions)
    return this.state.suggestions.map((suggest, i) => {
      return <SingleSuggest key={i} suggest={suggest}/>
    })
  }

  
  render() {
    if (this.props.loggedInUser.isAdmin) {
      return (
        <main>
          {this.renderSuggests()}
        </main>
      )
    }
    else {
      return (
        <NewSuggest loggedInUser={this.props.loggedInUser}/>
      )
    }
  }

}
