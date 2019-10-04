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
    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }

  addColor(color) {
    if (!this.state.colors.includes(color)) {
      const newColors = this.state.colors;
      newColors.push(color);
      this.setState({ colors: newColors });
    }
  }

  removeColor(color) {
    if (this.state.colors.includes(color)) {
      const index = this.state.colors.indexOf(color);
      const newColors = this.state.colors;
      newColors.splice(index, 1);
      this.setState({ colors: newColors });
    }
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
                {[
                  "Red",
                  "Orange",
                  "Yellow",
                  "Green",
                  "Blue",
                  "Purple",
                  "Black"
                ].map(color => {
                  return (
                    <Form.Check
                      inline
                      type="checkbox"
                      key={color}
                      label={color}
                      id={color}
                      name={color}
                      onClick={event => {
                        event.target.checked
                          ? this.addColor(color)
                          : this.removeColor(color);
                        console.log(this.state.colors);
                      }}
                    />
                  );
                })}
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
