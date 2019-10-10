import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { signUp, handleUpload } from "./../services/auth-api";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  onValueChange(event) {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
    console.log(this.state);
  }
  onInputChange(event) {
    const image = new FormData();
    image.append("imageUrl", event.target.files[0]);
    handleUpload(image).then(response => {
      this.setState({
        ...this.state,
        imageUrl: response.secure_url
      });
      console.log(this.state);
    });
  }

  signUp(event) {
    event.preventDefault();
    const { email, username, imageUrl, password } = this.state;
    signUp({ email, username, imageUrl, password })
      .then(user => {
        console.log(user);
        this.props.uploadUser(user);
        this.props.history.push(`/profile/${this.state.username}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <h1>SIGN UP</h1>
        <Form onSubmit={this.signUp}>
          <Form.Group>
            <Form.Label htmlFor="sign-up-email">Email</Form.Label>
            <Form.Control
              name="email"
              placeholder="email"
              required
              type="email"
              onChange={this.onValueChange}
              value={this.state.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="sign-up-username">Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="username"
              required
              onChange={this.onValueChange}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="sign-up-imageUrl">Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={event => this.onInputChange(event)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="sign-up-password">Password</Form.Label>
            <Form.Control
              name="password"
              required
              type="password"
              placeholder="Password"
              onChange={this.onValueChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </Container>
    );
  }
}
