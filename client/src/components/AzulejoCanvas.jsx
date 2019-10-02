import React, { Component, Fragment } from "react";
import Drawing from "./scripts/Drawing";

export default class AzulejoCanvas extends Component {
  componentDidMount() {
    const $canvas = document.getElementById("drawing-canvas");
    const $exportButton = document.getElementById("export-button");
    const $img = document.getElementById("image-goes-here");
    const $brushColor = document.getElementById("brush-color");
    const $brushSize = document.getElementById("brush-size");
    this.$brushSizeValue = document.getElementById("brush-size-value");

    $exportButton.addEventListener("click", () => {
      const img = $canvas.toDataURL("image/png");
      $img.innerHTML = `<img src="${img}" alt="my azulejo design" />`;
    });
    this.drawing = new Drawing($canvas);
    this.drawing.startMenu();
  }

  render() {
    return (
      <Fragment>
        <div id="brush-tools">
          <label htmlFor="brush-color">Choose brush color:</label>
          <input
            type="color"
            id="brush-color"
            defaultValue="#0055AA"
            onChange={event => {
              this.drawing.brushColor = event.target.value;
            }}
          />
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
