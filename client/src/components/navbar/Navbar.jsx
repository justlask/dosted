import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
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
                <button className="noButton" onClick={() => this.logoutUser()}>Logout</button>
              </Link>
              </div>
            </div>
        </nav>
      )
    } 
    else if (this.state.loggedInUser) {
        return ( 
          <nav>
            <div className="mainnav">
            <div></div>
            <Link to="/"><h1 className="bold">DOSTED</h1></Link>
            <Link to='/'>
                <button className="noButton" onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </div>
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