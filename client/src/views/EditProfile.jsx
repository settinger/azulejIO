import React, { Component } from "react";

import { edit, loadUser } from "./../services/auth-api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: ""
      }
    };
  }
  componentDidMount(props) {
    console.log(props);
    loadUser(this.props.user)
      .then(user => {
        this.setState({
          user: {
            ...user
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editUser() {
    edit(this.state.user)
      .then(user => {
        this.props.history.push(`/profile/${user.username}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // deleteUser() {
  //   const id = this.props.match.params.id;
  //   remove(id)
  //     .then(post => {
  //       this.props.history.push("/");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    const user = this.state.user;
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
