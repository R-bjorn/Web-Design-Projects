// Data Needed
var number = "";
var total = 0;
var string = "";

//Elements
var scrtxt = document.getElementById("screentext");
var scr = document.getElementById("screen");
var scrOp = document.getElementById("screen-op");

// Boolean Values
var ce = false; var eq = false; var add = false; var sub = false; var mul = false; var div = false;

// For checking if the input number is not out of limit
function checkLenght(num) {
  // if user has entered operation last time, reset number to ""
  if(eq == true)
    typeClear();
  // checking length by spliting number and counting
  var len = number.split("").length;
  if(len >= 11){
    alert("Limit : 11 Numbers Only"); 
    return;
  }
  number += num;
  string += num;
  scrtxt.value = string;
  scr.value = number;
}
// For all the Digits 
function type1() {   checkLenght("1"); }
function type2() {   checkLenght("2"); }
function type3() {   checkLenght("3"); }
function type4() {   checkLenght("4"); }
function type5() {   checkLenght("5"); }
function type6() {   checkLenght("6"); }
function type7() {   checkLenght("7"); }
function type8() {   checkLenght("8"); }
function type9() {   checkLenght("9"); }
function type0() {   checkLenght("0"); }


/*If user types 4 + 4 and then instead of equal sign, user press any operation, 
first we have to complete the past operation. This function checks if there are any past op left*/
function previousOp(){
  if(add == true || mul == true || sub == true || div == true)
    return true
  return false;
}

/*If the CE button is pressed and then user changes the operation, the past operation should be eqalized and then proceed
For example, Additing and Substraction's equalizer is 0, Multiplication and division's equalizer is 1*/
function ceButton(){
  if(ce == true){
    if(add == true || sub == true){
      number = "0"; string += "0";
    }else{
      number = "1"; string += "1";
    }
    typeans();
    add = false; sub = false; mul = false; div = false; ce = false;
  }
}

/*After entering the number when user enters the operations, 
it first resets the number, then print it out on screen and the make some boolean number true 
so that we can track if there are any previous operation left to complete*/
function print(sign){
  // Resetting Number to input a new number
  number = "";
  scrOp.value = sign;
  string += sign;
  scrtxt.value = string;

  if(sign == "+")
    add = true;
  if(sign == "-")
    sub = true;
  if(sign == "*")
    mul = true;
  if(div == "/")
    div = true;
}

function typeplus() {  
  ceButton();
  // for using plus multiple times without entering '=' 
  if(previousOp())
    typeans();  
  else{
    // adding number to total
    if(total == 0)
      total = parseInt(number);
    else
      total += parseInt(number);
  }
  // After using equal.. checking if user enters operation to modify ans:
  if(eq == true)
    eq = false;
  print("+");
}

function typesub() {
  ceButton();
  if(previousOp())
    typeans();
  else{
    if(total == 0)
      total = parseInt(number);
    else
      total -= parseInt(number);
  }
  if(eq == true)
    eq = false;
  print("-");
}

function typemul() {
  ceButton();
  if(previousOp())
    typeans();
  else{
    if(total == 0)
      total = parseInt(number);
    else
      total *= parseInt(number);
  }
  if(eq == true){
    eq = false;
  }
  print("*");
}

function typediv() {
  ceButton();
  if(previousOp())
    typeans();
  else{
    if(total == 0)
      total = parseInt(number);
    else
      total /= parseInt(number);
  }
  if(eq == true){
    eq = false;
  }
  print("/");
}

function typeans() {
  if(add == true){
    total += parseInt(number); add=false;  
  }
  if(sub == true){
    total -= parseInt(number); sub=false;
  }
  if(mul == true){
    total *= parseInt(number); mul=false;
  }
  if(div == true){
    total /= parseInt(number); div=false;
  }
  
  scr.value = total;
  scrOp.value = "=";
  string += "=" + total;
  scrtxt.value = string;
  number = "";
  eq = true;
}

function typeClear() {
  number = "";
  string = "";
  total = 0;
  eq = false;  add = false;  sub = false;  mul = false;  div = false; ce=false;
  scrtxt.value = "";
  scr.value = "";
  scrOp.value = "";
}

function typeClearNumber() {
  var n = string.search(number);
  var substr = string.substr(0,n);
  string = substr;
  scrtxt.value = string;
  
  number = "";
  scr.value = "";
  ce = true;
}

function typeBack(){
  var len = number.split("").length;
  var numstr = string.substr(0,len-1);
  number = numstr;
  scr.value = number;
  
  len = string.split("").length;
  var substr = string.substr(0,len-1);
  string = substr;
  scrtxt.value = string;
}