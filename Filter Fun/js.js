var image = null;
var original_image = null;


function setPixel(elem, r , g , b) {
  elem.setRed(r);
  elem.setGreen(g);
  elem.setBlue(b)
}

function imgtoCanvas() {
  imagefile = document.getElementById("imageFile");
  image = new SimpleImage(imagefile);
  original_image = new SimpleImage(imagefile);
  
  var can = document.getElementById("canvasImage");
  can.style.width = original_image.getWidth() + "px";
  can.style.height = original_image.getHeight() + "px";
  
  image.drawTo(can);
}

function setWidth(value) {
  document.getElementById("canvasImage").style.width = value + "em";
}

function setHeight(value) {
  document.getElementById("canvasImage").style.height = value + "em";
}

function makeRed() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  for(var elem of image.values() ) {
    elem.setRed("255");
  }
  image.drawTo(document.getElementById("canvasImage"));
}

function makeGray() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  for(var elem of image.values() ) {
    var avg = (elem.getRed() + elem.getGreen() + elem.getBlue() )/3;
    setPixel(elem,avg,avg,avg);
  }
  image.drawTo(document.getElementById("canvasImage"));
}

function makeRainbow() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  
  for(var elem of image.values() ) {
    var y = elem.getY();
    var h = image.getHeight();
    var avg = (elem.getRed() + elem.getGreen() + elem.getBlue())/3;
    if( y <= h/7 ){
      if(avg < 128){
        setPixel(elem, 2*avg , 0 , 0);
      }
      else{
        setPixel(elem, 255 , 2*avg-255 , 2*avg-255);
      }
    }
    else if( y <= 2*h/7){
      if(avg < 128){
        setPixel(elem, 2*avg , 0.8*avg , 0 );
      }
      else{
        setPixel(elem, 255 , 1.2*avg-51 , 2*avg-255);
      }
    }
    else if( y <= 3*h/7){
      if(avg < 128){
        setPixel(elem, 2*avg , 2*avg , 0);
      }
      else{
        setPixel(elem, 255 , 255 , 2*avg-255);
      }
    }
    else if( y <= 4*h/7){
      if(avg < 128){
        setPixel(elem, 0 , 2*avg , 0);
      }
      else{
        setPixel(elem, 2*avg-255 , 266 , 2*avg-255);
      }
    }
    else if( y <= 5*h/7){
      if(avg < 128){
        setPixel(elem, 0 , 0 , 2*avg);
      }
      else{
        setPixel(elem, 2*avg-255 , 2*avg - 255 , 255);
      }
    }
    else if( y <= 6*h/7){
      if(avg < 128){
        setPixel(elem, 0.8*avg , 0 , 2*avg);
      }
      else{
        setPixel(elem, 1.2*avg - 51 , 2*avg - 255 , 255);
      }
    }
    else if( y <= h){
      if(avg < 128){
        setPixel(elem, 1.6*avg , 0 , 1.6*avg);
      }
      else{
        setPixel(elem, 0.4*avg+153 , 2*avg-255 , 0.4*avg+153);
      }
    }    
  }
  image.drawTo(document.getElementById("canvasImage"));
}

function makeRedHue() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  
  for(var elem of image.values() ){
    var avg = (elem.getRed() + elem.getGreen() + elem.getBlue() )/3;
    
    if(avg < 128){
      setPixel(elem,2*avg,0,0);
    }
    else{
      setPixel(elem,255,2*avg-255,2*avg-255);
    }    
  }
  image.drawTo(document.getElementById("canvasImage"));
}

function nearBorder(x , y) {
  if(x < 30 || x > image.getWidth() - 30 || y < 30 || y > image.getHeight() - 30){
    return true;
  }
  return false;
} 

function makeBorder() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  
  for(var elem of image.values() ){
    if(nearBorder(elem.getX(), elem.getY())){
      setPixel(elem,0,0,0);
    }
  }
  
  image.drawTo(document.getElementById("canvasImage"));
}

function makeWindows (){
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  
  var w = image.getWidth();
  var h = image.getHeight();
  for(var elem of image.values() ){
    var x = elem.getX();
    var y = elem.getY();
    if(nearBorder(x,y) || (x > w/3 - 30 && x < w/3 + 30 ) || (x > 2*w/3 - 30 && x < 2*w/3 + 30 ) || (y > h/2 - 15 && y < h/2 + 15)){
      setPixel(elem,0,0,0);
    }
  }
  
  image.drawTo(document.getElementById("canvasImage"));
}

function makeTransparent(value) {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  
  for(var elem of image.values() ){
    elem.setAlpha(value);
  }
  image.drawTo(document.getElementById("canvasImage"));
  document.getElementById("scale").innerHTML = value;
} 

/*function randomPixel(x,y,elem){
  var oldX = elem.getX() ;
  var oldY = elem.getY() ;
  var randomX = Math.random() * 10;
  var randomY = Math.random() * 10;
  
  x = oldX + randomX;
  y = oldY + randomY;
 
  if(x >= image.getWidth()){
    x = oldX;
  }
  if(y >= image.getHeight()){
    y = oldY;
  }
  
}

function makeBlue() {
  for(var elem of image.values() ) {
    var random = Math.random();
    var x = null;
    var y = null;
    
    if(random < 0.5) {
      randomPixel(x,y,elem);
      var pix = image.getPixel(x,y);
      image.setPixel(elem.getX() , elem.getY() , pix);
    }    
  }
}*/

function reset() {
  if(image == null || !image.complete()){
    alert("File not uploaded");
    return;
  }
  for(var elem of image.values() ) {
    var x = elem.getX(); 
    var y = elem.getY();
    var pix = original_image.getPixel(x,y);
    image.setPixel(x,y,pix);
  }
  image.drawTo(document.getElementById("canvasImage"));
}