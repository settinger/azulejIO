import React, { Component, Fragment } from "react";

export default class GridLines extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const boxStyle = {
      pointerEvents: "none",
      position: "absolute",
      zIndex: "3",
      border: "2px dashed rgba(0,0,0,0.5)",
      padding: "0",
      margin: "0",
      width:
        (this.props.canvas &&
          this.props.canvas.getBoundingClientRect().width) ||
        "20%"
    };
    const diagStyle1 = {
      pointerEvents: "none",
      position: "absolute",
      zIndex: "4",
      width:
        (this.props.canvas &&
          this.props.canvas.getBoundingClientRect().width * 1.41) ||
        "1%",
      height: "0px",
      borderTop: "2px dashed rgba(0,0,0,0.5)",
      transformOrigin: "top left",
      transform: "rotate(-0.125turn)"
    };
    const diagStyle2 = {
      pointerEvents: "none",
      position: "absolute",
      zIndex: "4",
      width:
        (this.props.canvas &&
          this.props.canvas.getBoundingClientRect().width * 1.41) ||
        "1%",
      height: "0px",
      borderTop: "2px dashed rgba(0,0,0,0.5)",
      transformOrigin: "top left",
      transform: `translateY(-${this.props.canvas &&
        this.props.canvas.getBoundingClientRect().height}px) rotate(0.125turn)`
    };
    const horizStyle = {
      pointerEvents: "none",
      position: "absolute",
      zIndex: "4",
      width:
        (this.props.canvas &&
          this.props.canvas.getBoundingClientRect().width) ||
        "1%",
      height: "0px",
      borderTop: "2px dashed rgba(0,0,0,0.5)",
      transformOrigin: "top left",
      transform: `translateY(-${this.props.canvas &&
        this.props.canvas.getBoundingClientRect().height / 2}px)`
    };
    const vertStyle = {
      pointerEvents: "none",
      position: "absolute",
      zIndex: "4",
      width:
        (this.props.canvas &&
          this.props.canvas.getBoundingClientRect().width) ||
        "1%",
      height: "0px",
      borderTop: "2px dashed rgba(0,0,0,0.5)",
      transformOrigin: "top left",
      transform: `translateX(${this.props.canvas &&
        this.props.canvas.getBoundingClientRect().width /
          2}px) rotate(-0.25turn)`
    };
    return (
      <Fragment>
        <div style={diagStyle1}></div>
        <div style={diagStyle2}></div>
        <div style={horizStyle}></div>
        <div style={vertStyle}></div>
      </Fragment>
    );
  }
}
