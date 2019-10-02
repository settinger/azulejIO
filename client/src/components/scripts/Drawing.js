///////////////
// Drawing class for controlling object interactions, and drawing

class Drawing {
  constructor(canvas) {
    // First, set up the canvas and context
    this.canvas = canvas;
    // this.width = this.canvas.clientWidth;
    this.width = 1200;
    this.canvas.width = this.width;
    // this.height = this.canvas.clientHeight;
    this.height = 1200;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    this.context.resetTransform();
    this.context.translate(this.width / 2, this.height / 2); // Set origin to center of canvas

    // Access the inputs for brush size and brush color
    this.defaultBlue = "#0055AA";
    this.brushColor = this.defaultBlue;
    this.$brushColor = document.getElementById("brush-color");
    this.$brushColor.addEventListener("change", event => {
      this.brushColor = event.target.value;
    });

    this.brushSize = 20;
    this.$brushSize = document.getElementById("brush-size");
    this.$brushSize.addEventListener("input", event => {
      this.brushSize = event.target.value;
      document.getElementById("brush-size-value").innerText = this.brushSize;
    });

    this.drawing = false;
    this.currentPoint = [0, 0];

    this.dots = [];
    this.lines = [];

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.drawFour = this.drawFour.bind(this);
    this.drawEight = this.drawEight.bind(this);
  }

  // Start Menu: decorative patterns and a quick explainer of the rules
  startMenu() {
    this.isInPlay = false;
    document.addEventListener("mousedown", this.onMouseDown, false);
    document.addEventListener("touchstart", this.onMouseDown, {
      passive: false
    });
    document.addEventListener("mouseup", this.onMouseUp, false);
    document.addEventListener("touchend", this.onMouseUp, false);
    document.addEventListener("mousemove", this.onMouseMove, false);
    document.addEventListener("touchmove", this.onTouchMove, {
      passive: false
    });
    this.clear();
  }

  drawFour(x, y) {
    for (let pair of [[x, y], [-x, y], [x, -y], [-x, -y]]) {
      this.context.beginPath();
      this.context.arc(...pair, this.brushSize / 2, 0, Math.PI * 2);
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
    }
  }

  drawEight(x, y) {
    for (let pair of [
      [x, y],
      [-x, y],
      [x, -y],
      [-x, -y],
      [y, x],
      [-y, x],
      [-y, -x],
      [y, -x]
    ]) {
      this.context.moveTo(...pair);
      this.context.beginPath();
      this.context.arc(...pair, this.brushSize / 2, 0, Math.PI * 2);
      this.context.fill();
      this.context.closePath();
      this.dots.push(pair);
    }
  }

  drawFourLine(x1, y1, x2, y2) {
    for (let pair of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      this.context.lineWidth = this.brushSize;
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(x1 * pair[0], y1 * pair[1]);
      this.context.lineTo(x2 * pair[0], y2 * pair[1]);
      this.context.stroke();
      this.context.closePath();
      this.lines.push([x1, y1, x2, y2]);
    }
  }

  drawEightLine(x1, y1, x2, y2) {
    for (let pair of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      this.context.lineWidth = this.brushSize;
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(x1 * pair[0], y1 * pair[1]);
      this.context.lineTo(x2 * pair[0], y2 * pair[1]);
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      this.context.moveTo(y1 * pair[0], x1 * pair[1]);
      this.context.lineTo(y2 * pair[0], x2 * pair[1]);
      this.context.stroke();
      this.context.closePath();
      this.lines.push([x1, y1, x2, y2]);
      this.lines.push([y1, x1, y2, x2]);
    }
  }

  onMouseDown(event) {
    if (event.target === this.canvas) {
      event.preventDefault();
      this.drawing = true;
      let offsetTop = event.target.offsetTop;
      let offsetLeft = event.target.offsetLeft;
      let offsetWidth = event.target.offsetWidth;
      let offsetHeight = event.target.offsetHeight;
      let x =
        (event.clientX - offsetLeft - offsetWidth / 2) *
        (this.width / offsetWidth);
      let y =
        (event.clientY - offsetTop - offsetHeight / 2) *
        (this.width / offsetWidth);
      this.currentPoint = [x, y];
      this.context.fillStyle = this.brushColor;
      this.context.strokeStyle = this.brushColor;
      this.drawEight(x, y);
    }
  }

  onMouseUp(event) {
    this.drawing = false;
    // console.log("mouse/touch ended");
  }

  onMouseMove(event) {
    if (this.drawing && event.target === this.canvas) {
      let offsetTop = event.target.offsetTop;
      let offsetLeft = event.target.offsetLeft;
      let offsetWidth = event.target.offsetWidth;
      let offsetHeight = event.target.offsetHeight;
      let x =
        (event.clientX - offsetLeft - offsetWidth / 2) *
        (this.width / offsetWidth);
      let y =
        (event.clientY - offsetTop - offsetHeight / 2) *
        (this.width / offsetWidth);
      this.context.fillStyle = this.brushColor;
      this.context.strokeStyle = this.brushColor;
      this.drawEightLine(...this.currentPoint, x, y);
      this.currentPoint = [x, y];
      // console.log(this.lines);
    }
  }

  onTouchMove(event) {
    if (this.drawing && event.target === this.canvas) {
      event.preventDefault();
      let offsetTop = event.target.offsetTop;
      let offsetLeft = event.target.offsetLeft;
      let offsetWidth = event.target.offsetWidth;
      let offsetHeight = event.target.offsetHeight;
      let x =
        (event.targetTouches[0].clientX - offsetLeft - offsetWidth / 2) *
        (this.width / offsetWidth);
      let y =
        (event.targetTouches[0].clientY - offsetTop - offsetHeight / 2) *
        (this.width / offsetWidth);
      this.context.fillStyle = this.brushColor;
      this.context.strokeStyle = this.brushColor;
      this.drawEightLine(...this.currentPoint, x, y);
      this.currentPoint = [x, y];
    }
  }

  // Clear screen: clear all graphics before drawing new frame
  clear() {
    this.context.fillStyle = "white";
    this.context.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
  }
}
