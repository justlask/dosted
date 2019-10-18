import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'
import axios from 'axios'
import serverUrl from '../../configServer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


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
      <div className="buttons">
        <Button onClick={() => this.addDOST()} name={<FontAwesomeIcon icon={faCheck} />} />
        <Button onClick={() => this.deleteDOST()} name={<FontAwesomeIcon icon={faTimes} />} />
      </div>
    )
  }

  deleteDOST(e) {
    axios.delete(`${serverUrl}/suggestions/delete/${this.props.suggest._id}`)
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
    axios.post(`${serverUrl}/action/new`, newDOST)
    .then(response => {
      this.setState({
        added: true
      })
    })
    axios.delete(`${serverUrl}/suggestions/delete/${this.props.suggest._id}`)
    .then(response => {
      this.setState({
        added: false
      })
    })

  }

  render() {
    return (
        <div className="card suggest w-50">
          <div className="card-body">
            <h2 className="card-title">{this.props.suggest.title}</h2>
            {this.handleButton()}
          </div>
        </div>
    )
  }
}
