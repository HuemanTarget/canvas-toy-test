//setup canvas
let canvas = document.getElementById("canvas-board");
let ctx = canvas.getContext("2d");
let cw = canvas.width;
let ch = canvas.height;
canvas.style.border = "1px solid black";

//get buttons and sliders
let rect = document.getElementById("rect");
let circ = document.getElementById("circ");
let del = document.getElementById("delete");
let type = document.getElementById("type");
let xPos = document.getElementById("xPos");
let yPos = document.getElementById("yPos");
let itemColor = document.getElementById("itemColor");
let radSlide = document.getElementById("radius");
let hSlide = document.getElementById("height");
let wSlide = document.getElementById("width");

//variables
let isDragging = false;
let startX, startY;
let selectedShapeIndex;

//setup canvas bounding areas on resize
function reOffset() {
  let BB = canvas.getBoundingClientRect();
  offsetX = BB.left;
  offsetY = BB.top;
}
let offsetX, offsetY;
reOffset();
window.onscroll = function (e) {
  reOffset();
};
window.onresize = function (e) {
  reOffset();
};
canvas.onresize = function (e) {
  reOffset();
};

//canvas mouse movements
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

//shapes array to store shape objects
let shapes = [];

//Event Listener to add shape objects to the shapes array
rect.addEventListener("click", function () {
  shapes.push({
    name: "rectangle",
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
    width: 60,
    height: 50,
    color: "black",
  });
  drawAll();
});

circ.addEventListener("click", function () {
  shapes.push({
    name: "circle",
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
    radius: 50,
    color: itemColor.value,
    border: null,
  });
  drawAll();
});

function isMouseInShape(mx, my, shape) {
  if (shape.radius) {
    // this is a circle
    let dx = mx - shape.x;
    let dy = my - shape.y;
    // math test to see if mouse is inside circle
    if (dx * dx + dy * dy < shape.radius * shape.radius) {
      // yes, mouse is inside this circle
      return true;
    }
  } else if (shape.width) {
    // this is a rectangle
    let rLeft = shape.x;
    let rRight = shape.x + shape.width;
    let rTop = shape.y;
    let rBott = shape.y + shape.height;
    // math test to see if mouse is inside rectangle
    if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
      return true;
    }
  }
  // the mouse isn't in any of the shapes
  return false;
}

//draw shapes at their current position
const drawAll = () => {
  ctx.clearRect(0, 0, ch, cw);
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (shape.radius) {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.fillStyle = shape.color;
      ctx.fill();
    } else if (shape.width) {
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    }
  }
};
