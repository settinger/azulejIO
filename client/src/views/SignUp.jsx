import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { signUp } from "./../services/auth-api";

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
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  signUp(event) {
    console.dir(event);
    event.preventDefault();
    const { email, username, password } = this.state;
    signUp({ email, username, password })
      .then(user => {
        this.props.loadUser(user);
        this.props.history.push("/");
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
          {/* <Form.Group>
            <Form.Label htmlFor="sign-up-profilePic">Profile Image</Form.Label>
            <Form.Control
              name="profilePic"
              placeholder="profilePic"
              required
              type="file"
              onChange={e => this.onValueChange(e)}
              value={this.state.profilePic}
            />
          </Form.Group> */}
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
