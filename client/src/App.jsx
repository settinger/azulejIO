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
import { signOut, verify } from "./services/auth-api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.uploadUser = this.uploadUser.bind(this);
    this.signOut = this.signOut.bind(this);
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
  render() {
    return (
      <div className="App">
        <Router>
          <NavbarView user={this.state.user} signOut={this.signOut} />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route
              path="/auth/signup"
              render={props => (
                <SignUpView {...props} exact uploadUser={this.uploadUser} />
              )}
            />
            <Route
              path="/auth/signin"
              render={props => (
                <SignInView {...props} exact uploadUser={this.uploadUser} />
              )}
            />
            <Route path="/profile/:username" exact component={ProfileView} />
            <Route path="/auth/signout" exact component={HomeView} />
            <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} />
          </Switch>
        </Router>
      </div>
    );
  }
}
