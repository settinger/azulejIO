import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { signIn } from "../services/auth-api";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = (event.target.type = event.target.value);
    this.setState({
      [name]: value
    });
  }

  signIn(event) {
    event.preventDefault();
    const { username, password } = this.state;
    signIn({ username, password })
      .then(user => {
        // this.props.loadUser(user);
        this.props.history.push("/profile");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <h1>SIGN IN</h1>
        <Form onSubmit={this.signIn}>
          <Form.Group>
            <Form.Label htmlFor="sign-up-username">username</Form.Label>
            <Form.Control
              id="sign-up-username"
              name="username"
              required
              placeholder="username"
              onChange={this.onValueChange}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="sign-up-password">Password</Form.Label>
            <Form.Control
              id="sign-up-password"
              name="password"
              required
              type="password"
              placeholder="Password"
              onChange={this.onValueChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Sign In</Button>
        </Form>
      </Container>
    );
  }
}
