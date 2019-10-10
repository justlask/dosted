import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import SingleAction from './SingleAction'

export default class TodayAction extends Component {
  state = {
    action: {}
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  TodayAction = () =>{
    this.service.randomAction()
    .then( response => {
      console.log(response)
      this.setState({
        action: response
      });
    }).catch( error => console.log(error))
  }

  componentDidMount() {
    return this.TodayAction();
  }
  

  render() {
    console.log(this)
    return (
      <div>
          <div className="card text-white bg-success mb-3">
          <div className="card-header">Your DOSTED for today!</div>
          <div className="card-body">
            <p className="card-text">{this.state.action.title}</p>
            <p className="card-text small">This task has been completed {this.state.action.timesCompleted} times</p>
          </div>
        </div>
      </div>
    )
  }
}