import React, { Component, Fragment } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import ErrorView from "./views/Error";
import CatchAllView from "./views/CatchAll";
import SignUpView from "./views/SignUp";
import SignInView from "./views/SignIn";
import ProfileView from "./views/Profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.loadUser = this.loadUser.bind(this);
  }
  loadUser(user) {
    this.setState({
      user
    });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route
              path="/auth/signup"
              render={props => (
                <SignUpView {...props} exact loadUser={this.loadUser} />
              )}
            />
            <Route path="/auth/signin" exact component={SignInView} />
            <Route path="/profile/:id" exact component={ProfileView} />
            <Route path="/auth/logout" exact component={HomeView} />
            <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} />
          </Switch>
        </Router>
      </div>
    );
  }
}
