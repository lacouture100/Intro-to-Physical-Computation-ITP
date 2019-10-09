var serial; // variable to hold an instance of the serialport library
var portName = 'COM5'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

let motorPos =0;

function setup() {
  createCanvas(640, 480);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);

  stroke(255);
  line(mouseX,0, mouseX,height);
  line(0,mouseY,width,mouseY);

  textSize(18);
  text(( "X:" + mouseX), mouseX+10, mouseY );
  text(( "Y:" + mouseX), mouseX+10, mouseY + 20 );

  text (("Sent message: " + outByte), width - 200,height - 20);
  text (("Motor position: " + motorPos), width - 200,height - 40);
  fill(0,0,0);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  motorPos = inByte;
  // debug if serial communication is happening
  //console.log(inData);
  ellipse( width - 220,height - 47, 20,20);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function mouseDragged() {
  //map the mouseY to a range from 0 to 179, tha maximum amount of degree
  outByte = int(map(mouseY, 0, height, 0, 179));
  //send it out the serial port:
  serial.write(outByte);
  fill(0,255,0);
  ellipse( width - 220,height - 27, 20,20);
}
