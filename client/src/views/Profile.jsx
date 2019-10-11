import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { loadUser } from "../services/auth-api";
import { loadSearch, loadFavs } from "../services/azulejo-api";
import AzulejoThumbnail from "./../components/AzulejoThumbnail";
import AzulejoThumbnailMod from "./../components/AzulejoThumbnailMod";
import EditProfile from "./../components/EditProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Edit profile",
      editProfileState: false,
      user: null,
      azulejos: null,
      azulejosFav: null
    };
    this.toggleEditProfile = this.toggleEditProfile.bind(this);
    this.loadAzulejosFav = this.loadAzulejosFav.bind(this);
    this.loadAzulejos = this.loadAzulejos.bind(this);
    this.noAzulejosFaved = this.noAzulejosFaved.bind(this);
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
      .then(response =>
        this.setState({
          ...this.state,
          azulejos: response.azulejos
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  loadAzulejosFav(userId) {
    loadFavs(`fav=${userId}`)
      .then(azulejosFav => {
        this.setState({
          ...this.state,
          azulejosFav
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadUser();
    this.loadAzulejos();
    // this.loadAzulejosFav();
  }

  componentDidUpdate(previousProps, previousState) {
    // if (
    //   !this.state.azulejos ||
    //   previousState.azulejos !== this.state.azulejos
    // ) {
    //   this.loadAzulejos();
    // } else
    // if (
    //   !this.state.azulejosFav ||
    //   previousState.azulejosFav !== this.state.azulejosFav
    // ) {
    //   this.loadAzulejosFav();
    // }
    if (
      !this.state.user ||
      previousProps.match.params.username !== this.props.match.params.username
    ) {
      this.loadUser();
      this.loadAzulejos();
      // this.loadAzulejosFav();
    }
  }

  noAzulejosFaved() {
    return (
      (this.props.user && this.props.user._id === this.state.user._id && (
        <p>
          You haven't favorited any azulejos yet!{" "}
          <Link to="/">Go browse the existing designs</Link> and find some you
          like!
        </p>
      )) || <p>This user hasn't favorited any azulejos yet!</p>
    );
  }

  render() {
    const user = this.state.user;
    return (
      user && (
        <Container>
          <Col>
            <Row className="pt-5">
              <Col sm={2}>
                <img src={user.imageUrl} alt={user.username} width="100px" />
              </Col>
              <Col sm={3}>
                <Row className="flex-lg-wrap">
                  <h1 className="flex-lg-wrap">{user.username}'s profile</h1>
                </Row>
                <Row>
                  {(!this.props.user && <div></div>) ||
                    (this.props.user._id === user._id && (
                      <Button
                        onClick={this.toggleEditProfile}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#333"
                        }}
                      >
                        + {this.state.buttonText}
                      </Button>
                    ))}
                </Row>
              </Col>
              <Col>
                {this.state.editProfileState && (
                  <EditProfile user={this.state.user} redir={this.props} />
                )}
              </Col>
            </Row>
            <Row>
              {(this.props.user && user._id === this.props.user._id && (
                <h2>Check your azulejos:</h2>
              )) || <h2>{user.username}'s azulejos:</h2>}
            </Row>
            <div className="card-set">
              {(this.state.azulejos &&
                this.state.azulejos.length > 0 &&
                this.state.azulejos.map(azulejo => {
                  return (
                    <AzulejoThumbnailMod
                      key={azulejo._id}
                      id={azulejo._id}
                      name={azulejo.name}
                      img={azulejo.imageUrl}
                      createdBy={azulejo._createdBy.username}
                      colors={azulejo.colors}
                      reviews={azulejo.reviews}
                      fav={azulejo.fav}
                      remixedFromTitle={
                        azulejo._remixedFrom && azulejo._remixedFrom.name
                      }
                      remixedFromId={
                        azulejo._remixedFrom && azulejo._remixedFrom._id
                      }
                      remixedFromUser={
                        azulejo._remixedFrom &&
                        azulejo._remixedFrom._createdBy &&
                        azulejo._remixedFrom._createdBy.username
                      }
                      user={this.props.user}
                      loadAzulejosFav={this.loadAzulejosFav}
                    />
                  );
                })) || (
                <p>
                  You haven't designed any azulejos yet!{" "}
                  <Link to="/azulejo/create">Go design a new one</Link> or find
                  an existing design to remix!
                </p>
              )}
            </div>
            {this.props.user && user._id === this.props.user._id && (
              <Fragment>
                <Row>
                  {" "}
                  <h2>Your favourite azulejos:</h2>
                </Row>

                <div className="card-set ">
                  {(this.state.azulejosFav &&
                    this.state.azulejosFav.length > 0 &&
                    this.state.azulejosFav.map(azulejo => {
                      return (
                        <AzulejoThumbnail
                          key={azulejo._id}
                          id={azulejo._id}
                          name={azulejo.name}
                          img={azulejo.imageUrl}
                          createdBy={azulejo._createdBy.username}
                          colors={azulejo.colors}
                          reviews={azulejo.reviews}
                          fav={azulejo.fav}
                          remixedFromTitle={
                            azulejo._remixedFrom && azulejo._remixedFrom.name
                          }
                          remixedFromId={
                            azulejo._remixedFrom && azulejo._remixedFrom._id
                          }
                          remixedFromUser={
                            azulejo._remixedFrom &&
                            azulejo._remixedFrom._createdBy &&
                            azulejo._remixedFrom._createdBy.username
                          }
                          user={this.props.user}
                          loadAzulejosFav={this.loadAzulejosFav}
                        />
                      );
                    })) || <Row>{this.noAzulejosFaved()}</Row>}
                </div>
              </Fragment>
            )}
          </Col>
        </Container>
      )
    );
  }
}
