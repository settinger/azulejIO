import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { loadUser } from "../services/auth-api";
import { loadSearch } from "../services/azulejo-api";
import AzulejoThumbnail from "./../components/AzulejoThumbnail";
import EditProfile from "./../components/EditProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Edit profile",
      editProfileState: false,
      user: null,
      azulejos: null
    };
    this.toggleEditProfile = this.toggleEditProfile.bind(this);
  }

  toggleEditProfile() {
    this.setState({
      editProfileState: !this.state.editProfileState
    });
    this.state.editProfileState
      ? this.setState({ buttonText: "Edit Profile" })
      : this.setState({ buttonText: "Cancel" });
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

  loadAzulejos() {
    loadSearch(`user=${this.props.match.params.username}`)
      .then(azulejos =>
        this.setState({
          ...this.state,
          azulejos
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadUser();
    this.loadAzulejos();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      !this.state.user ||
      previousProps.match.params.username !== this.props.match.params.username
    ) {
      this.loadUser();
      this.loadAzulejos();
    }
  }

  render() {
    const user = this.state.user;
    console.log(this.props);
    return (
      user && (
        <div>
          <h1>KING</h1>
          <h1>{user.username}</h1>
          <h2>Profile Page</h2>
          <span>Check your azulejos:</span>
          <div className="card-set">
            {this.state.azulejos &&
              this.state.azulejos.map(azulejo => {
                return (
                  <AzulejoThumbnail
                    key={azulejo._id}
                    id={azulejo._id}
                    name={azulejo.name}
                    img={azulejo.imageUrl}
                    colors={azulejo.colors}
                    reviews={azulejo.reviews}
                  />
                );
              })}
          </div>
          {(!this.props.user && <div></div>) ||
            (this.props.user._id === user._id && (
              <Button className="btn" onClick={this.toggleEditProfile}>
                {this.state.buttonText}
              </Button>
            ))}
          {this.state.editProfileState && (
            <EditProfile user={this.state.user} />
          )}
        </div>
      )
    );
  }
}
