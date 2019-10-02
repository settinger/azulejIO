import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loadUser } from "../services/azulejo-api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  loadUser() {
    loadUser(this.props.user)
      .then(user => {
        this.setState({
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      !this.state.user ||
      previousProps.match.params.id !== this.props.match.params.id
    ) {
      this.loadUser();
    }
  }

  render() {
    const user = this.state.user;
    return (
      (user && (
        <div>
          <h1>KING</h1>
          <h1>{user.username}</h1>
          <h2>Profile Page</h2>
          <span>Check your azulejos:</span>
          <Link to={`/profile/${user.username}/edit`}>Edit Profile</Link>
        </div>
      )) || <div></div>
    );
  }
}
