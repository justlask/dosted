import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import ActionCard from '../actions/ActionCard'

export default class FriendProfile extends Component {
  state = {
    friend: {}
  }
  constructor(props){
    super(props);
    this.service = new AuthService();
  }
  componentDidMount() {
    this.service.getFriend(this.props.match.params.id)
    .then(data => 
      this.setState({
        friend: data
      })
      )
    .catch(err => console.log(err))

  }

  getActions = () => {
    console.log(this.state.friend.actions)
    if (this.state.friend.actions === undefined) {
      return <div>...loading</div>
    }
    else {
      return this.state.friend.actions.map(action => {
        console.log(action)
        return <ActionCard action={action} />
      })
    }
  }


  render() {
    return (
      <main>
        <div className="halfrow">
          <div className="card mb-3 profileImg">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={this.state.friend.image} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body flexy">
                  
                  <h5 className="card-title">@{this.state.friend.username}</h5>
                  <p className="card-text">{this.state.friend.bio}</p>
                  <p className="card-text"><small className="text-muted">Actions Completed: {this.state.friend.actionsCompleted}</small></p>
                  <p className="card-text"><small className="text-muted">Streak: {this.state.friend.currentStreak}</small></p>
                </div>
              </div>
            </div>
          </div>
          <div className="actioncard">
            <h3>Actions Completed:</h3>
            {this.getActions()}
          </div>
        </div>
      </main>
    )
  }
}


