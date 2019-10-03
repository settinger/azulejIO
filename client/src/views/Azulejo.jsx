import React, { Component } from "react";
import AzulejoCanvas from "../components/AzulejoCanvas";

export default class Azulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.saveToAccount = this.saveToAccount.bind(this);
  }

  saveToAccount() {
    const img = this.$canvas.toDataURL("image/png");
    // To do: pass this img to the backend, where it then gets uploaded to cloudinary
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
