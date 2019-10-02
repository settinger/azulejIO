import React, { Fragment } from "react";

const AzulejoCanvas = () => {
  return (
    <Fragment>
      <div id="brush-tools">
        <label for="brush-color">Choose brush color:</label>
        <input type="color" id="brush-color" value="#0055AA" />
        <br />
        <input
          type="range"
          id="brush-size"
          name="brush-size"
          min="1"
          max="40"
          value="20"
          step="1"
        />
        <label for="brush-size">
          Brush size: <span id="brush-size-value">20</span>
        </label>
      </div>
      <div id="game-board">
        <canvas id="game-canvas"></canvas>
      </div>
      <div>
        <button id="export-button">Export as .png</button>
      </div>
      <div id="image-goes-here"></div>
      <script type="text/javascript" src="./scripts/Drawing.js" />
      <script type="text/javascript" src="./scripts/Main.js" />
    </Fragment>
  );
};

export default AzulejoCanvas;
