import React, { Component, Fragment } from "react";
import AzulejoCanvas from "../components/AzulejoCanvas";
import { create } from "../services/azulejo-api";
import Form from "react-bootstrap/Form";

export default class Azulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: []
    };
    this.saveToAccount = this.saveToAccount.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(event) {
    console.log(event.target.value);
    console.log(this.state);
    this.setState({
      name: event.target.value
    });
  }

  saveToAccount() {
    const img = this.$canvas.toDataURL("image/png");
    const button = document.getElementById("save-to-account");
    button.innerText = "Loading...";

    const azulejo = {
      name: this.state.name,
      colors: this.state.colors,
      image: img
    };
    create(azulejo)
      .then(azulejo => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.$canvas = document.getElementById("drawing-canvas");
  }

  render() {
    return (
      <div>
        <AzulejoCanvas />
        {this.props.user && (
          <Fragment>
            <Form>
              <Form.Group>
                <Form.Label htmlFor="sign-up-email">Name</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="name"
                  required
                  type="name"
                  onChange={this.onValueChange}
                  value={this.state.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="sign-up-username">Colors:</Form.Label>
                <Form.Check
                  inline
                  label="Yellow"
                  type="checkbox"
                  id={`Yellow`}
                  name="Yellow"
                  onChange={() =>
                    this.state.colors.includes("Yellow")
                      ? {}
                      : this.state.colors.push("Yellow")
                  }
                />
                <Form.Check
                  inline
                  label="Green"
                  type="checkbox"
                  id={`Green`}
                  name="Green"
                  onChange={() =>
                    this.state.colors.includes("Green")
                      ? {}
                      : this.state.colors.push("Green")
                  }
                />
              </Form.Group>
            </Form>
            <button onClick={this.saveToAccount} id="save-to-account">
              Save to my account
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}
