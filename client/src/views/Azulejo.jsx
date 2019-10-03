import React, { Component } from "react";
import AzulejoCanvas from "../components/AzulejoCanvas";
import { create } from "../services/azulejo-api";

export default class Azulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.saveToAccount = this.saveToAccount.bind(this);
  }

  saveToAccount() {
    const img = this.$canvas.toDataURL("image/png");

    const azulejo = {
      name: "First Azulejo",
      colors: ["Yellow", "Green"],
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
          <button onClick={this.saveToAccount}>Save to my account</button>
        )}
      </div>
    );
  }
}
