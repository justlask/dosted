import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import SingleAction from './SingleAction'

export default class AllActions extends Component {
  state = {
    actions: []
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  allActions = () =>{
    this.service.allActions()
    .then( response => {
      this.setState({
        actions: response
      });
    }).catch( error => console.log(error))
  }

  componentDidMount() {
    return this.allActions();
  }

  render() {
    return (
      <div>
        {
          this.state.actions.map(action => {
            return <SingleAction thisAction={action}/>
          })
        }
      </div>
    )
  }
}
