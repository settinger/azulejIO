import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { signIn } from "../services/auth-api";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  signIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    signIn({ email, password })
      .then(user => {
        this.props.uploadUser(user);
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signin-bg">
        <Col sm={3}>
          {/* <Row>
            <h1
              className="header-text"
              style={{ fontFamily: "Constantia, serif" }}
            >
              SIGN IN
            </h1>
          </Row> */}
          <div className="signin-square">
            <Row>
              <Form onSubmit={this.signIn}>
                <Form.Group>
                  {/* <Form.Label htmlFor="sign-up-email">Email</Form.Label> */}
                  <Form.Control
                    id="sign-up-email"
                    name="email"
                    required
                    type="email"
                    placeholder="email"
                    onChange={this.onValueChange}
                    value={this.state.email}
                  />
                </Form.Group>
                <Form.Group>
                  {/* <Form.Label htmlFor="sign-up-password">Password</Form.Label> */}
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
                <Button type="submit" className="d-flex justify-content-center">
                  Sign In
                </Button>
              </Form>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}
