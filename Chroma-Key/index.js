var fgimage = null;
var bgimage = null;

function upload_fg () {
  var img = document.getElementById("fgimage");
  fgimage = new SimpleImage(img);
  
  fgimage.drawTo(document.getElementById("fg_canvas"));
}

function upload_bg () {
  var img = document.getElementById("bgimage");
  bgimage = new SimpleImage(img);
  
  bgimage.drawTo(document.getElementById("bg_canvas"));  
}

function greenScreen() {
  if(fgimage == null || !fgimage.complete() ){
    alert("foreground image not loaded");
    return;
  }
  if(bgimage == null || !bgimage.complete() ){
    alert("background image not loaded");
    return;
  }
  
  var greenScr = new SimpleImage(fgimage.getWidth() , fgimage.getHeight() );
  
  for(var elem of fgimage.values() ){
    var x = elem.getX();
    var y = elem.getY();
    
    if(elem.getGreen() > ( elem.getRed() + elem.getBlue() ) ){
      var bgpix = bgimage.getPixel(x,y);
      greenScr.setPixel(x , y , bgpix );
    }
    else{
      greenScr.setPixel(x , y , elem );
    }    
  }
  
  clearCanvas();
  greenScr.drawTo(document.getElementById("fg_canvas"));
}

function clearCanvas() {
  var canvas =  document.getElementById("fg_canvas");
  var cnx = canvas.getContext("2d");
  cnx.clearRect(0,0,canvas.width , canvas.height);
  
  canvas =  document.getElementById("bg_canvas");
  var cnx = canvas.getContext("2d");
  cnx.clearRect(0,0,canvas.width , canvas.height);
  
  document.getElementById("fgimage").value = "";
  document.getElementById("bgimage").value = "";
}