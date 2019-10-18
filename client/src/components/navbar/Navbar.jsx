import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faUser } from '@fortawesome/free-solid-svg-icons'
import Admin from '../auth/Admin'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render(){
    if(this.state.loggedInUser && this.state.loggedInUser.isAdmin){
      return(
        <nav>
            <div className="mainnav">              
            <Admin loggedInUser={this.state.loggedInUser}/>
              <Link to="/"><h1 className="bold">DOSTED</h1></Link>
              <div className="navbuttons">
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
              </div>
            </div>
        </nav>
      )
    } 
    else if (this.state.loggedInUser) {
        return ( 
          <nav className="mainnav">
            <div></div>
            <Link to="/"><h1 className="bold">DOSTED</h1></Link>
            <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
          </nav>
        )
    }
    else {
      return ( 
        <nav className="mainnav">
          <div></div>
          <Link to="/"><h1 className="bold">DOSTED</h1></Link>
          <div></div>
        </nav>
      )
    }
  }
}

export default Navbar;