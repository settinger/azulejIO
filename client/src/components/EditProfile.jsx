import React, { Component } from "react";

import { edit, remove, handleUpload } from "./../services/auth-api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        imageUrl: ""
      },
      button: {
        state: true,
        text: "Edit profile"
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  }

  onInputChange(event) {
    const image = new FormData();
    image.append("imageUrl", event.target.files[0]);
    this.setState({
      ...this.state,
      button: {
        state: false,
        text: "Loading image... "
      }
    });
    handleUpload(image).then(response => {
      this.setState({
        user: { ...this.state.user, imageUrl: response.secure_url }
      });
    });
  }

  editUser(event) {
    event.preventDefault();
    const user = this.state.user;
    edit(this.state.user.username, user)
      .then(user => {
        console.dir(this.props);
        // this.props.history.push("/");
        this.props.redir.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser() {
    console.log(this.props.history);
    remove(this.props.user.username)
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.user.imageUrl !== nextState.user.imageUrl) {
      this.setState({
        ...this.state,
        button: {
          state: true,
          text: "Update profile!"
        }
      });
    }
  }

  render() {
    return (
      <Container>
        <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
        <Form onSubmit={this.editUser}>
          <Form.Group>
            <Form.Label htmlFor="sign-up-username">Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="username"
              required
              onChange={this.onValueChange}
              defaultValue={this.state.user.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="sign-up-imageUrl">Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={event => this.onInputChange(event)}
            />
          </Form.Group>
          <Button
            disabled={!this.state.button.state}
            variant="outline-success"
            type="submit"
          >
            {this.state.button.text}
          </Button>
        </Form>
        <Button variant="outline-danger" onClick={this.deleteUser}>
          Delete
        </Button>
      </Container>
    );
  }
}
