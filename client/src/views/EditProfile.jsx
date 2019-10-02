import React, { Component } from "react";

import { edit, loadUser } from "./../services/auth-api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldUsername: this.props.match.params.username,
      user: {
        username: ""
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.editUser = this.editUser.bind(this);
    // // this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    loadUser()
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

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  editUser() {
    edit(this.state.oldUsername, this.state.user)
      .then(user => {
        console.log(user);
        // this.props.history.push(`/profile/${this.state.user.username}`);
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
    return (
      <Container>
        <h1>EDIT YOUR PROFILE</h1>
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </Container>
    );
  }
}
