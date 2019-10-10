import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Profile extends Component {
  render() {
    return (
      <main>
        <img src="" alt="user's profile picture"/>
        <p>image</p>
        <p>actions completed</p>
        <p>location</p>
        <p>biography</p>

        {"... do an if isn't friend and isnt self, add button"}
        <p>button</p>
      </main>
    )
  }
}
