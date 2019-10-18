import React, { Component } from 'react'

export default class ActionCard extends Component {
  render() {
    return (
      <div className="card actioncard">
        <div className="card-body">
          {this.props.action.title}
        </div>
      </div>
    )
  }
}
