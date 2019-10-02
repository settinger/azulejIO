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
    this.onValueChange = this.onValueChange.bind(this);
    this.editUser = this.editUser.bind(this);
    // // this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    // loadUser()
    //   .then(singleUser => {
    //     console.log(singleUser);
    //     this.setState({
    //       user: singleUser
    //     });
    //     console.log(this.state);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.setState({
      user: this.props.user
    });
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      user: { [name]: value }
    });
  }

  editUser() {
    const user = this.state.user;
    edit(this.state.user.username, user)
      .then(user => {
        // this.props.history.push("/");
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
    return (
      <Container>
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
          <Button type="submit">Edit Profile</Button>
        </Form>
      </Container>
    );
  }
}
