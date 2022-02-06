var paintcanvas = document.getElementById("canvas1");
var context = paintcanvas.getContext("2d");
var color = 'black';
var radius = 50;
// only paint if mouse is  being dragged (moved while the button is pressed)
var isPainting = false;

function change() {
  var width = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  if(!isNumeric(width) || !isNumeric(height)){
    alert("Not a valid Number : ")
  }
  
  var can = document.getElementById("canvas1");
  can.style.width = width + "px";
  can.style.height = height+ "px";  
}

function clearCanvas () {
  context.clearRect(0, 0, paintcanvas.width, paintcanvas.height);
}

function paintCircle (x, y) {
    // make sure to start a new circle each time
    context.beginPath();
    // draw circle using a complete (2*PI) arc around given point
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}
// verify the given value is actually a number
function isNumeric (value) {
  // standard JavaScript function to determine whether a string is an illegal number (Not-a-Number)
  return !isNaN(value);
}

function startPaint() {
  isPainting = true;
}

function endPaint() {
  isPainting = false;
}

function doPaint(x, y) {
  if(!isPainting){
    return;
  }
  paintCircle(x,y);
}

function changeColor(colorInput) {
  color = colorInput;
}

function resizeBrush(newSize){
  radius = newSize;
  document.getElementById("sizeOutput").innerHTML = newSize;
}