//setup canvas
let canvas = document.getElementById("canvas-board");
let ctx = canvas.getContext("2d");
let cw = canvas.width;
let ch = canvas.height;
canvas.style.border = "1px solid black";

//get html ids
let rect = document.getElementById("rect");
let circ = document.getElementById("circ");
let delCirc = document.getElementById("deleteCirc");
let delRec = document.getElementById("deleteRec");
let type = document.getElementById("type");
let xPosCirc = document.getElementById("xPosCirc");
let yPosCirc = document.getElementById("yPosCirc");
let xPosRec = document.getElementById("xPosRec");
let yPosRec = document.getElementById("yPosRec");
let itemCircColor = document.getElementById("itemCircColor");
let itemRecColor = document.getElementById("itemRecColor");
let radSlide = document.getElementById("radius");
let hSlide = document.getElementById("height");
let wSlide = document.getElementById("width");
let atCirc = document.getElementById("atributesCirc");
let atRec = document.getElementById("atributesRec");

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

//setup adding shapes with buttons
let shapes = [];

//event listeners
rect.addEventListener("click", function () {
  shapes.push({
    name: "rectangle",
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
    width: 60,
    height: 50,
    color: itemRecColor,
  });
  drawAll();
});

circ.addEventListener("click", function () {
  shapes.push({
    name: "circle",
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
    radius: parseInt(radSlide.value),
    color: itemCircColor,
  });
  drawAll();
});

let isDragging = false;
let startX, startY;
let selectedShapeIndex;

canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

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

function handleMouseDown(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // calculate the current mouse position
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
  // test mouse position against all shapes
  // post result if mouse is in a shape
  for (let i = 0; i < shapes.length; i++) {
    if (isMouseInShape(startX, startY, shapes[i])) {
      // the mouse is inside this shape
      // select this shape
      selectedShapeIndex = i;
      let selectedShape = shapes[selectedShapeIndex];
      console.log(selectedShape);
      // type.innerText = selectedShape.name;
      if (selectedShape.name === "circle") {
        atCirc.style.visibility = "visible";
        selectedShape.radius = parseInt(radSlide.value);
        selectedShape.color = itemCircColor.value;
        delCirc.addEventListener("click", function () {
          shapes.splice(selectedShapeIndex, 1);
          atCirc.style.visibility = "hidden";
          drawAll();
        });
      } else if (selectedShape.name === "rectangle") {
        atRec.style.visibility = "visible";
        selectedShape.width = parseInt(wSlide.value);
        selectedShape.height = parseInt(hSlide.value);
        selectedShape.color = itemRecColor.value;
        delRec.addEventListener("click", function () {
          shapes.splice(selectedShapeIndex, 1);
          atRec.style.visibility = "hidden";
          drawAll();
        });
      }

      console.log(selectedShapeIndex);

      // set the isDragging flag
      isDragging = true;

      return;
    }
  }
}

function handleMouseUp(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // the drag is over -- clear the isDragging flag
  isDragging = false;
}

function handleMouseOut(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // the drag is over -- clear the isDragging flag
  isDragging = false;
}

function handleMouseMove(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // calculate the current mouse position
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  // how far has the mouse dragged from its previous mousemove position?
  let dx = mouseX - startX;
  let dy = mouseY - startY;
  // move the selected shape by the drag distance
  let selectedShape = shapes[selectedShapeIndex];
  selectedShape.x += dx;
  selectedShape.y += dy;

  //set position for circ and rect in HTML
  if (selectedShape.name === "circle") {
    xPosCirc.innerText = selectedShape.x;
    yPosCirc.innerText = selectedShape.y;
  } else if (selectedShape.name === "rectangle") {
    xPosRec.innerText = selectedShape.x;
    yPosRec.innerText = selectedShape.y;
  }

  // clear the canvas and redraw all shapes
  drawAll();
  // update the starting drag position (== the current mouse position)
  startX = mouseX;
  startY = mouseY;
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
