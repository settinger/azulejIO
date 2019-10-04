import React, { Component, Fragment } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import ErrorView from "./views/Error";
import CatchAllView from "./views/CatchAll";
import SignUpView from "./views/SignUp";
import SignInView from "./views/SignIn";
import ProfileView from "./views/Profile";
import AzulejoView from "./views/Azulejo";
import SingleAzulejoView from "./views/SingleAzulejo";
import EditProfile from "./components/EditProfile";
import NavbarView from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { signOut, verify } from "./services/auth-api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
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
            ...(user && { user }),
            loaded: true
          });
        } else {
          this.setState({
            loaded: true
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
  signOut() {
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

          {this.state.loaded && (
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
                  <SignInView {...props} exact uploadUser={this.uploadUser} />
                )}
              />
              <Route
                path="/profile/:username"
                exact
                render={props => (
                  <ProfileView {...props} user={this.state.user} />
                )}
              />

              <ProtectedRoute
                path="/profile/:username/edit"
                verify={this.verifyAuthenticated}
                exact
                render={props => (
                  <EditProfile {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/azulejo/create"
                exact
                render={props => (
                  <AzulejoView {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/azulejo/:id"
                exact
                render={props => (
                  <SingleAzulejoView {...props} user={this.state.user} />
                )}
              />
              <Route path="/error/:code" component={ErrorView} />
              <Route path="/" component={CatchAllView} />
            </Switch>
          )}
        </Router>
      </div>
    );
  }
}
