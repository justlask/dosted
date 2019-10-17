
import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protectedRoute';
import AllActions from './components/actions/AllActions'
import Home from './components/Home'
import Footer from './components/Footer'
import TodayAction from './components/actions/TodayAction'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import Leaderboard from './components/Leaderboard';
import Friends from './components/profile/Friends'
import NewSuggestion from './components/suggestions/NewSuggest'
import AllSuggest from './components/suggestions/AllSuggest';
import FriendProfile from './components/profile/FriendProfile';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    {this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path='/' render={() => <Home user={this.state.loggedInUser} getUser={this.getTheUser}/>}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/actions' component={AllActions} />
            <ProtectedRoute user={this.state.loggedInUser} path='/profile/:id' component={FriendProfile} />
            <ProtectedRoute user={this.state.loggedInUser} path="/profile" component={Profile} />
            <ProtectedRoute user={this.state.loggedInUser} path='/action' component={TodayAction} />
            <ProtectedRoute user={this.state.loggedInUser} path="/edit" component={EditProfile} getUser={this.getTheUser} />
            <ProtectedRoute user={this.state.loggedInUser} path="/leaderboard" component={Leaderboard}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/friends' component={Friends} />
            <ProtectedRoute user={this.state.loggedInUser} path='/suggestion' component={NewSuggestion}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/admin' component={AllSuggest} />
                        {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} /> */}
          </Switch>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/' render={() => <Home getUser={this.getTheUser}/>}/>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={(props) => <Login user={this.state.loggedInUser} {...props} getUser={this.getTheUser}/>}/>
              {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} /> */}
            </Switch>
          <Footer />
        </div>
      );
    }
  }
}
export default App;