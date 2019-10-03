import React, { Component } from "react";
import AzulejoCanvas from "../components/AzulejoCanvas";

export default class Azulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.canvas = null;
  }
  render() {
    return (
      <div>
        <AzulejoCanvas />
        {this.props.user && <button>Save to my account</button>}
      </div>
    );
  }
}
