import React, { Component } from 'react';
import Button from './Button'

export default class Home extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.user === undefined) {
      return (
        <div className="flexcolfull">
          <div className="titleName">
            <h1 className="dostedtitle">
              <span className="firsty">D</span>o<br></br>
              <span className="firsty">O</span>ne<br></br>
              <span className="firsty">S</span>mall<br></br>
              <span className="firsty">T</span>hing<br></br>
              <span className="firsty">E</span>very<br></br>
              <span className="firsty">D</span>ay<br></br>
            </h1>
          </div>
          <div className="buttons">
            <Button name="Signup" link="/signup"/>
            <Button name="Login" link="/login" />
          </div>
        </div>
      )
    }
    else {
      return (
        <main>
          <div className="titleName">
            <h1>
              Do<br></br>
              One<br></br>
              Small<br></br>
              Thing<br></br>
              Every<br></br>
              Day<br></br>
            </h1>
          </div>
        </main>
      )
    }
  }
}
