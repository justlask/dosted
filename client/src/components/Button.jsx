import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Link to={this.props.link}><button onClick={this.props.onClick}>{this.props.name}</button></Link>
      </div>
    )
  }
}
