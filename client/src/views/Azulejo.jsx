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
    this.$canvas.toBlob(blob => {
      const button = document.getElementById("save-to-account");
      button.innerText = "Loading...";

      const azulejo = {
        name: this.state.name,
        colors: this.state.colors,
        image: blob
      };
      if (this.state.remix) {
        azulejo._remixedFrom = this.state.remixedFrom;
        // console.log(azulejo);
      }

      const formData = new FormData();
      for (let key in azulejo) {
        let value = azulejo[key];
        if (key === "colors") value = JSON.stringify(azulejo[key]);
        formData.append(key, value);
      }

      create(formData)
        .then(azulejo => {
          this.props.history.push(`/azulejo/${azulejo._id}`);
        })
        .catch(error => {
          console.log(error);
          button.innerText = "Save to my account";
        });
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
      <div className="container">
        <AzulejoCanvas
          remixUrl={this.state.remixUrl}
          user={this.props.user}
          addColor={this.addColor}
          removeColor={this.removeColor}
          onValueChange={this.onValueChange}
          saveToAccount={this.saveToAccount}
        />
        <div id="image-goes-here"></div>
      </div>
    );
  }
}
