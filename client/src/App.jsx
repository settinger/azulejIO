import React, { Component, Fragment } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import ErrorView from "./views/Error";
import CatchAllView from "./views/CatchAll";
import SignUpView from "./views/SignUp";
import SignInView from "./views/SignIn";
import ProfileView from "./views/Profile";
import NavbarView from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { signOut, verify } from "./services/auth-api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.uploadUser = this.uploadUser.bind(this);
    this.signOut = this.signOut.bind(this);
    this.verifyAuthenticated = this.verifyAuthenticated.bind(this);
    this.verifyUnauthenticated = this.verifyUnauthenticated.bind(this);
  }
  componentDidMount() {
    verify()
      .then(user => {
        if (user) {
          this.setState({
            user
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  uploadUser(user) {
    this.setState({
      user
    });
  }
  signOut(event) {
    event.preventDefault();
    signOut()
      .then(() => {
        this.setState({
          user: null
        });
        this.props.history.push("/auth/signup");
      })
      .catch(error => {
        console.log(error);
      });
  }

  verifyAuthenticated() {
    return !!this.state.user;
  }

  verifyUnauthenticated() {
    return !this.state.user;
  }
  render() {
    return (
      <div className="App">
        <Router>
          <NavbarView user={this.state.user} signOut={this.signOut} />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <ProtectedRoute
              path="/auth/signup"
              verify={this.verifyUnauthenticated}
              render={props => (
                <SignUpView {...props} exact uploadUser={this.uploadUser} />
              )}
            />
            <ProtectedRoute
              path="/auth/signin"
              verify={this.verifyUnauthenticated}
              render={props => (
                <SignInView {...props} exact loadUser={this.uploadUser} />
              )}
            />
            <ProtectedRoute
              path="/profile/:username"
              verify={this.verifyAuthenticated}
              component={ProfileView}
            />
            <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} />
          </Switch>
        </Router>
      </div>
    );
  }
}
