import React, { Component, Fragment } from "react";
import Drawing from "./scripts/Drawing";
import GridLines from "./GridLines";

import { SketchPicker } from "react-color";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class AzulejoCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: { r: 0, g: 85, b: 170, a: 1 },
      canvas: undefined,
      gridLines: false
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.colorChanged = this.colorChanged.bind(this);
    this.boundingBoxChanged = this.boundingBoxChanged.bind(this);
    this.checkboxChecked = this.checkboxChecked.bind(this);
  }

  checkboxChecked(event) {
    this.setState({ gridLines: !this.state.gridLines });
  }

  boundingBoxChanged(event) {
    let DOMrect = this.drawing.canvas.getBoundingClientRect();
    this.drawing.offsetTop = DOMrect.top;
    this.drawing.offsetLeft = DOMrect.left;
    this.drawing.offsetWidth = DOMrect.width;
    this.drawing.offsetHeight = DOMrect.height;
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
    this.setState({ canvas: $canvas });
    const $exportButton = document.getElementById("export-button");
    const $img = document.getElementById("image-goes-here");
    // const $brushColor = document.getElementById("brush-color");
    // const $brushSize = document.getElementById("brush-size");
    this.$brushSizeValue = document.getElementById("brush-size-value");

    $exportButton.addEventListener("click", () => {
      // const img = $canvas.toDataURL("image/png");
      // const tabImage = new Image();
      // tabImage.src = img;
      // // $img.innerHTML = `<img src="${img}" alt="my azulejo design" />`;
      // const newTab = window.open("");
      // newTab.document.write(tabImage.outerHTML);
      // console.log(tabImage.outerHTML);
      const link = document.createElement("a");
      link.download = "azulejo.png";
      const img = $canvas.toBlob(blob => {
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    });

    this.drawing = new Drawing($canvas);
    this.drawing.startMenu();

    // Calculate canvas bounding box offsets (and recompute when window resizes/scrolls)
    this.boundingBoxChanged();

    const $header = document.querySelector("nav");
    $header.addEventListener("transitionrun", e => {
      setTimeout(this.boundingBoxChanged, 750);
    });

    window.addEventListener("scroll", this.boundingBoxChanged);
    window.addEventListener("resize", this.boundingBoxChanged);
  }

  componentDidUpdate() {
    if (this.props.remixUrl && !this.remixLoaded) {
      // console.log(this.props.remixUrl);
      const remix = new Image();
      remix.crossOrigin = "anonymous";
      remix.src = this.props.remixUrl;
      setTimeout(() => {
        this.drawing.context.drawImage(remix, -600, -600);
      }, 500);
      this.remixLoaded = true;
    }
  }

  render() {
    return (
      <Fragment>
        <h1 className="mt-4">Azulejo designer</h1>
        <Row>
          <Col md="8">
            <div id="drawing-board" style={{ maxWidth: "85vh" }}>
              <canvas
                id="drawing-canvas"
                className="img-fluid"
                style={{
                  border: "1px solid rgba(0,0,0,.1)",
                  backgroundColor: "white",
                  marginBottom: "-6px"
                }}
              ></canvas>
              {this.state.gridLines && <GridLines canvas={this.state.canvas} />}
            </div>
          </Col>
          <Col md="4">
            <div id="brush-tools" style={{ fontSize: "1em" }}>
              {/* <SketchPicker /> */}
              <label htmlFor="brush-color">Choose brush color: </label>
              <div
                style={{
                  margin: "0 .4em",
                  padding: ".4em",
                  boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                  borderRadius: "1px",
                  display: "inline-block",
                  cursor: "pointer",
                  transform: "translateY(.4em)"
                }}
                onClick={this.toggleColorPicker}
              >
                <div
                  style={{
                    width: "3.2em",
                    height: "1em",
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
                    disableAlpha
                    color={this.state.color}
                    onChange={this.colorChanged}
                    presetColors={[
                      "#D0021B",
                      "#F5A623",
                      "#F8E71C",
                      "#8B572A",
                      "#7ED321",
                      "#417505",
                      "#BD10E0",
                      "#9013FE",
                      "#0055AA",
                      "#4A90E2",
                      "#50E3C2",
                      "#B8E986",
                      "#000000",
                      "#4A4A4A",
                      "#9B9B9B",
                      "#FFFFFF"
                    ]}
                  />
                </div>
              )}
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
                style={{
                  transform: "translateX(-.4em) translateY(0em)",
                  width: "6em"
                }}
              />
              <label htmlFor="brush-size">
                Brush size: <span id="brush-size-value">20</span>
              </label>
              <br />
              <button
                onClick={this.checkboxChecked}
                className="btn btn-primary mb-5"
              >
                Toggle grid lines
              </button>
            </div>
            {(this.props.user && (
              <Fragment>
                <Form onSubmit={this.props.saveToAccount}>
                  <Form.Group>
                    <Form.Label htmlFor="azulejo-name">
                      Azulejo Name:
                    </Form.Label>
                    <Form.Control
                      id="azulejo-name"
                      name="name"
                      placeholder="name"
                      required
                      type="name"
                      onChange={this.props.onValueChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="azulejo-colors"
                      style={{ paddingRight: "6px" }}
                    >
                      Colors:
                    </Form.Label>
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
                              ? this.props.addColor(color)
                              : this.props.removeColor(color);
                          }}
                        />
                      );
                    })}
                  </Form.Group>
                  <button id="save-to-account" className="btn btn-primary">
                    Save to my account
                  </button>
                </Form>
              </Fragment>
            )) || (
              <Fragment>
                <Link to="/auth/signup">Sign up</Link> or{" "}
                <Link to="/auth/signin">sign in</Link> to save, share, and remix
                your designs!
              </Fragment>
            )}
            <div>
              <button
                id="export-button"
                className="btn btn-primary"
                style={{ margin: "20px 0" }}
              >
                Export as .png
              </button>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
