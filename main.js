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