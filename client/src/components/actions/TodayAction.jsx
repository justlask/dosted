import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import SingleAction from './SingleAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Sidebar from '../Sidebar'

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
          <Sidebar/>
          <div className="half">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Today's DOST</div>
                <div className="card-body">
                  <p className="card-text">{this.state.action.title}</p>
                  <p className="card-text small">This task has been completed {this.state.action.timesCompleted} times</p>
                </div>
                <div className="buttons">
                  <Button onClick={() => {this.handleCompleted()}} name={<FontAwesomeIcon icon={faCheck} />}/>
                  <Button link="/action" name={<FontAwesomeIcon icon={faTimes} />}/>
                </div>
            </div>
          </div>
        </main>
      )
    }
    else {
      return (
        <main>
          <Sidebar/>
          <div className="half">
            <h1>CONGRATS!</h1>
            <h3>You've done your part!</h3>
          </div>
        </main>
      )
    }

  }
}