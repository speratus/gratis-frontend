import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import MainContainer from './containers/MainContainer'
import FriendListContainer from './containers/FriendListContainer'
import FriendContainer from './containers/FriendContainer'

class App extends React.Component {

  state = {
    loggedIn: false,
    currentUserId: 0
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({loggedIn: true})
    }
  }

  onLogout = () => {
    localStorage.removeItem('token')
    this.setLoggedIn(false)
  }

  setLoggedIn = (loggedIn, userId) => {
    this.setState({loggedIn: loggedIn, currentUserId: userId})
  }

  render() {
    return (
      <Router>
        <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout}/>
        <Switch>
          <Route exact path='/'>
            <MainContainer loggedIn={this.state.loggedIn}/>
          </Route>
          <Route path='/login'>
            <LoginForm setLoggedIn={this.setLoggedIn}/>
          </Route>
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route path='/friends'>
            <FriendListContainer loggedIn={this.state.loggedIn}/>
          </Route>
          <Route path='/users/:userId' render={routeParams => {
            console.log(routeParams)
            return <FriendContainer {...routeParams} />
          }} />
        </Switch>
      </Router>
    )
  }
}

export default App;
