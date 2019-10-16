import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faUser } from '@fortawesome/free-solid-svg-icons'

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
    if(this.state.loggedInUser){
      return(
        <nav>
            <div className="mainnav">
              {/* <Link to="/leaderboard"><FontAwesomeIcon icon={faChartLine} /></Link> */}
              <Link to="/"><h1>DOSTED</h1></Link>
              <div>
              {/* <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link> */}
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
              </div>
            </div>
            Welcome, {this.state.loggedInUser.username}
            {/* <Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link> */}

        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
          <Link to="/"><h1>DOSTED</h1></Link>
          {/* <ul>
            <li><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul> */}
        </nav>
      )
    }
  }
}

export default Navbar;