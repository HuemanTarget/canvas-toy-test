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

//variables
let isDragging = false;
let startX, startY;
let selectedShapeIndex;

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
























