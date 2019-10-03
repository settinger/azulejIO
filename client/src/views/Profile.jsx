import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { loadUser } from "../services/auth-api";
import EditProfileView from "./EditProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Edit profile",
      editProfileState: false,
      user: null
    };
    this.toggleEditProfile = this.toggleEditProfile.bind(this);
  }
  toggleEditProfile() {
    this.setState({
      editProfileState: !this.state.editProfileState
    });
    this.state.editProfileState
      ? this.setState({ buttonText: "Edit Profile" })
      : this.setState({ buttonText: "Undo" });
  }
  loadUser() {
    loadUser(this.props.match.params.username)
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
          {/* <Link to={`/profile/${user.username}/edit`}>Edit Profile</Link> */}
          <Button className="btn" onClick={this.toggleEditProfile}>
            {this.state.buttonText}
          </Button>
          {this.state.editProfileState && (
            <EditProfileView user={this.state.user} />
          )}
        </div>
      )) || <div></div>
    );
  }
}
