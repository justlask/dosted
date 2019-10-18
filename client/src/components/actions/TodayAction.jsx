import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import SingleAction from './SingleAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Map from '../Map'

export default class TodayAction extends Component {
  state = {
    action: {},
    actionCompleted: false,
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

  handleCompleted(e) {
    const actionID = this.state.action._id
    const userID = this.props.loggedInUser._id

    this.service.actionCompleted(userID, actionID)
    .then(response => {
      this.setState({
        actionCompleted: true
      })
    }).catch(err => console.log(err))
  }
  

  render() {
    if (this.state.actionCompleted === false) {
      return (
        <main>
          <div className="card text-white action">
            <div className="card-header action">Today's DOST</div>
            <div className="card-body action">
              <p className="card-text action">{this.state.action.title}</p>
              <p className="card-text action small">This task has been completed {this.state.action.timesCompleted} times</p>
            </div>
            <div className="buttons">
              <Button onClick={() => {this.handleCompleted()}} name={<FontAwesomeIcon icon={faCheck} />}/>
              <Button link="/action" name={<FontAwesomeIcon icon={faTimes} />}/>
            </div>
          </div>
        </main>
      )
    }
    else {
      return (
        <main>
          <div className="half">
            <h1>CONGRATS!</h1>
            <h3>You've done your part!</h3>
            <Map />
          </div>
        </main>
      )
    }

  }
}