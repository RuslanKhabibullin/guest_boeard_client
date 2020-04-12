import React, { Component } from 'react';
import NavBar from './NavBar'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import SignUp from './session/SignUp'
import SignIn from './session/SignIn'
import SignOut from './session/SignOut'
import Dashboard from './Dashboard'
import { googleAuthInit } from '../services/googleApi'
import Alert from './Alert'

const NotFound = () => <h1>404 Not Found</h1>

class App extends Component {
  componentDidMount() {
    googleAuthInit()
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
