import React, { Component } from 'react'
import Button from '../Button'

export default class Admin extends Component {
  render() {

    if (this.props.loggedInUser.isAdmin) {
      return (
        <Button link={"/admin"} name="admin panel" />
    )
    }
    else {
      return 
    }
  }
}
