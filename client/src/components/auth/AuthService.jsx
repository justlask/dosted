import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password) => {
    return this.service.post('/auth/signup', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/auth/logout', {})
    .then(response => response.data)
  }

  getProfile = () => {
    return this.service.get('/auth/profile')
    .then(response => response.data)
  }

  findFriends = (userID) => {
    return this.service.get(`/user/friends/${userID}`)
    .then(response => response.data)
  }

  follow = (userID, friendID) => {
    return this.service.put('/user/follow', {userID, friendID})
    .then(response => response.data)
  }

  unfollow = (userID, friendID) => {
    return this.service.put('/user/unfollow', {userID, friendID})
    .then(response => response.data)
  }

  deleteProfile = (id) => {
    return this.service.delete('/auth/delete')
    .then(response => response.data)
  }

  actionCompleted = (userID, actionID) => {
    return this.service.put('/user/completed', {userID, actionID})
    .then(response => response.data)
  }

  allActions = () => {
    return this.service.get('/action')
    .then(response => response.data)
  }

  randomAction = () => {
    return this.service.get('/action/random')
    .then(response => response.data)
  }
  handleUpload (theFile) {
    return this.service.post('/user/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  getFriend(friendID) {
    return this.service.get(`/user/profile/${friendID}`)
    .then(res => res.data)
    .catch(err => console.log(err))
  }
  resetPass(email) {
    return this.service.post(`/auth/resetpassword`, { email })
    .then(res => res)
    .catch(err => console.log(err))
  }

  changePassword(password) {
    return this.service.post('/auth/changepassword', {password})
    .then(res =>  res.data)
    .catch(err => console.log(err))
  }

  editProfile = (bio, image) => {
    return this.service.post('/user/profile/edit', {bio, image})
    .then(res => res.data)
    .catch(err => console.log(err))
  }

  getLeaderBoard = () => {
    return this.service.get('/user/leaderboard')
    .then(res => res.data)
    .catch(err => console.log(err))
  }
}

export default AuthService;