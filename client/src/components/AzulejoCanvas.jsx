import React, { Component, Fragment } from "react";
import Drawing from "./scripts/Drawing";

import { SketchPicker } from "react-color";

export default class AzulejoCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: { r: 0, g: 85, b: 170, a: 1 }
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.colorChanged = this.colorChanged.bind(this);
  }

  toggleColorPicker(event) {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  colorChanged(event) {
    // console.log(event);
    this.drawing.brushColor = event.hex;
    this.setState({ color: event.rgb });
  }

  componentDidMount() {
    const $canvas = document.getElementById("drawing-canvas");
    const $exportButton = document.getElementById("export-button");
    const $img = document.getElementById("image-goes-here");
    // const $brushColor = document.getElementById("brush-color");
    // const $brushSize = document.getElementById("brush-size");
    this.$brushSizeValue = document.getElementById("brush-size-value");

    $exportButton.addEventListener("click", () => {
      const img = $canvas.toDataURL("image/png");
      $img.innerHTML = `<img src="${img}" alt="my azulejo design" />`;
    });
    this.drawing = new Drawing($canvas);
    this.drawing.startMenu();

    // Calculate canvas bounding box offsets (and recompute when window resizes/scrolls)
    let DOMrect = this.drawing.canvas.getBoundingClientRect();
    this.drawing.offsetTop = DOMrect.top;
    this.drawing.offsetLeft = DOMrect.left;
    this.drawing.offsetWidth = DOMrect.width;
    this.drawing.offsetHeight = DOMrect.height;

    window.addEventListener("scroll", e => {
      DOMrect = this.drawing.canvas.getBoundingClientRect();
      this.drawing.offsetTop = DOMrect.top;
      this.drawing.offsetLeft = DOMrect.left;
      this.drawing.offsetWidth = DOMrect.width;
      this.drawing.offsetHeight = DOMrect.height;
    });
    window.addEventListener("resize", e => {
      DOMrect = this.drawing.canvas.getBoundingClientRect();
      this.drawing.offsetTop = DOMrect.top;
      this.drawing.offsetLeft = DOMrect.left;
      this.drawing.offsetWidth = DOMrect.width;
      this.drawing.offsetHeight = DOMrect.height;
    });
  }

  componentDidUpdate() {
    if (this.props.remixUrl) {
      // console.log(this.props.remixUrl);
      const remix = new Image();
      remix.crossOrigin = "anonymous";
      remix.src = this.props.remixUrl;
      setTimeout(() => {
        this.drawing.context.drawImage(remix, -600, -600);
      }, 500);
    }
  }

  render() {
    return (
      <Fragment>
        <div id="brush-tools">
          {/* <SketchPicker /> */}
          <label htmlFor="brush-color">Choose brush color: </label>
          <div
            style={{
              padding: "5px",
              boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
              borderRadius: "1px",
              display: "inline-block",
              cursor: "pointer"
            }}
            onClick={this.toggleColorPicker}
          >
            <div
              style={{
                width: "40px",
                height: "15px",
                borderRadius: "2px",
                background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
              }}
            ></div>
          </div>
          {this.state.displayColorPicker && (
            <div style={{ position: "absolute", zIndex: "2" }}>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px"
                }}
                onClick={() => this.setState({ displayColorPicker: false })}
              ></div>
              <SketchPicker
                color={this.state.color}
                onChange={this.colorChanged}
              />
            </div>
          )}
          {/* <input
            type="color"
            id="brush-color"
            defaultValue="#0055AA"
            onChange={event => {
              this.drawing.brushColor = event.target.value;
            }}
          /> */}
          <br />
          <input
            onChange={() => {}}
            onInput={event => {
              this.drawing.brushSize = event.target.value;
              this.$brushSizeValue.innerText = this.drawing.brushSize;
            }}
            type="range"
            id="brush-size"
            name="brush-size"
            min="1"
            max="40"
            defaultValue="20"
            step="1"
          />
          <label htmlFor="brush-size">
            Brush size: <span id="brush-size-value">20</span>
          </label>
        </div>
        <div id="drawing-board">
          <canvas
            id="drawing-canvas"
            style={{
              border: "1px solid red",
              backgroundColor: "white",
              width: "60vw",
              height: "60vw"
            }}
          ></canvas>
        </div>
        <div>
          <button id="export-button">Export as .png</button>
        </div>
        <div id="image-goes-here"></div>
      </Fragment>
    );
  }
}
