/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

const mySoundModelURL = 'https://storage.googleapis.com/teachable-machine-pubilshed-models/4685a232-9712-4450-9cf1-f0030db4005d/model.json';
let mySoundModel; // my ML5 sound classifier
let resultDiv;
let resultDiv1;
let resultDiv2;
let outByte =0; //variable that sends data to the Arduino

var serial;   // variable to hold an instance of the serialport library
var portName = 'COM5';    // fill in your serial port name here
var inData;   // variable to hold the input data from Arduino

var minWidth = 600;   //set min width and height for canvas
var minHeight = 400;
var width, height;    // actual width and height for the sketch

let outData = 1;
let servoState =1;
let canvas;

function preload (){
  mySoundModel = ml5.soundClassifier(mySoundModelURL);
}

function setup() {
  //set up canvas
  canvas = createCanvas(300, 400);
  canvas.mousePressed(sendServoOn);
  canvas.mouseReleased(sendServoOff);
  //resultDiv = createElement('h1',  'Servo state : '+ servoState);
  resultDiv1 = createElement('h1',  'Out data : '+ outData);
  resultDiv2 = createElement('h1',  'In data : '+ inData);
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
function sendServoOn(){
  outData = 1;
  bg.color(255);

}
function sendServoOff(){
  outData = 0;
  bg.color(0);
}
function draw() {
  // set background to black
  fill(100);
  bg = background(100);
  text(outData,100,100);


  serial.write(outData);
  console.log(outData);
  //print(inData);
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
  inData = serial.readLine(); // Read the serial messages from the Arduino
  print("Data received from Arduino: " + str(inData)); //Print the data
}

function serialError(err) {
  print('Something went wrong with the serial port: ' + err);
}

function portClose() {
  print('The serial port closed.');
}
