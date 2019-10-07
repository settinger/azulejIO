import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AzulejoCanvas from "../components/AzulejoCanvas";
import { create, loadSingle } from "../services/azulejo-api";
import Form from "react-bootstrap/Form";

export default class Azulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: [],
      remix: false
    };
    // Check if we are remixing an existing design
    if (this.props.match.params.id) {
      this.state.remixedFrom = this.props.match.params.id;
      this.state.remix = true;
      this.state.remixUrl = false;
    }
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
    // console.log(event.target.value);
    // console.log(this.state);
    this.setState({
      name: event.target.value
    });
  }

  saveToAccount(event) {
    event.preventDefault();
    const img = this.$canvas.toDataURL("image/png");
    const button = document.getElementById("save-to-account");
    button.innerText = "Loading...";

    const azulejo = {
      name: this.state.name,
      colors: this.state.colors,
      image: img
    };
    if (this.state.remix) {
      azulejo._remixedFrom = this.state.remixedFrom;
      // console.log(azulejo);
    }
    create(azulejo)
      .then(azulejo => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        button.innerText = "Save to my account";
      });
  }

  componentDidMount() {
    this.$canvas = document.getElementById("drawing-canvas");
    // If we're making a remix, load the image URL to remix from
    if (this.state.remix) {
      // console.log("A remix is occurring");
      loadSingle(this.props.match.params.id)
        .then(azulejo => {
          this.setState({ remixUrl: azulejo.imageUrl });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <AzulejoCanvas remixUrl={this.state.remixUrl} />
        {(this.props.user && (
          <Fragment>
            <Form onSubmit={this.saveToAccount}>
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
              <button id="save-to-account">Save to my account</button>
            </Form>
          </Fragment>
        )) || (
          <Fragment>
            <Link to="/auth/signup">Sign up</Link> or{" "}
            <Link to="/auth/signin">sign in</Link> to save, share, and remix
            your designs!
          </Fragment>
        )}
        <div id="image-goes-here"></div>
      </div>
    );
  }
}
