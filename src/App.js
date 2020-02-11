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
import FriendsContainer from './containers/FriendsContainer'

class App extends React.Component {

  state = {
    loggedIn: false
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

  setLoggedIn = loggedIn => {
    this.setState({loggedIn: loggedIn})
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
            <FriendsContainer loggedIn={this.state.loggedIn}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
