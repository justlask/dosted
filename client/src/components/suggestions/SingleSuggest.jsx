import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'
import axios from 'axios'

export default class SingleSuggest extends Component {
  state = {
    added: false,
    deleted: false
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }
  handleButton(){
    return (
      <div>
        <Button onClick={() => this.addDOST()} name="add DOST" />
        <Button onClick={() => this.deleteDOST()} name="delete DOST" />
      </div>
    )
  }

  deleteDOST(e) {
    axios.delete(`/api/suggestions/delete/${this.props.suggest._id}`)
    .then(response => {
      this.setState({
        deleted: true
      })
    })
  }

  addDOST(e) {
    let newDOST = {
      title: this.props.suggest.title,
      creator: this.props.suggest.creator
    }
    axios.post('/api/action/new', newDOST)
    .then(response => {
      this.setState({
        added: true
      })
    })
    axios.delete(`/api/suggestions/delete/${this.props.suggest._id}`)
    .then(response => {
      this.setState({
        added: false
      })
    })

  }

  render() {
    return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">{this.props.suggest.title}</h5>
        {this.handleButton()}
      </div>
    </div>
    )
  }
}
