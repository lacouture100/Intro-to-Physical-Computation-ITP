/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

var serial;   // variable to hold an instance of the serialport library
var portName = 'COM5';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino

var minWidth = 600;   //set min width and height for canvas
var minHeight = 400;
var width, height;    // actual width and height for the sketch
var buttonNumber;

function setup() {
  // set the canvas to match the window size

  //set up canvas
  createCanvas(300, 400);
  noStroke();

  //set up communication port
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  // set background to black
  background(100);

  fill(255);

  drawCubes();
  let outData = 5;
  serial.write(outData);
  print(inData);


}
function drawCubes(){
  //console.log(inData);
  //Blue
  if (inData==3||inData==51){
  fill(0,0,255);

  }
  //Red
  else if(inData==2||inData==50){
  fill(255,0,0);

  }
  //Yellow
  else if(inData==1||inData==49){
  fill(255,255,0);

  }
  //White
  else if(inData==4||inData==52){
  fill(255,255,255);

  }
  //Orange
  else if(inData==5||inData==52){
  fill(255,165,0);

  }
  //Green
  else if(inData==6||inData==52){
  fill(0,255,0);



  }
  //
  else if(inData==0||inData==54){
  fill(0,0,0);



  }
  else{
  fill(0,0,0);



  }
  rect(0,0,300,400);
}


// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
  print(inData);


}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

// function graphData(newData) {
//   // map the range of the input to the window height:
//   var yPos = map(newData, 0, 255, 0, height);
//   // draw the line in a pretty color:
//   stroke(0xA8, 0xD9, 0xA7);
//   line(xPos, height, xPos, height - yPos);
//   // at the edge of the screen, go back to the beginning:
//   if (xPos >= width) {
//     xPos = 0;
//     // clear the screen by resetting the background:
//     background(0x08, 0x16, 0x40);
//   } else {
//     // increment the horizontal position for the next reading:
//     xPos++;
//   }
// }
