import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Button extends Component {
  render() {
    return (
      <div>
        <Link to={this.props.link}><button>{this.props.name}</button></Link>
      </div>
    )
  }
}
