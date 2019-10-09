
#include <Servo.h>

Servo myservo;  // create servo object to control a servo

const int buttonPin0 = 2;
const int ledPin0 =  2;
int incomingMsg = 0;
int mappedValue = 0;

void setup() { 
  Serial.print("starting");
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  pinMode(ledPin0, OUTPUT);
}

void loop() {
  
  Serial.write("Serial message from Arduino");
  incomingMsg = Serial.read();
  if (incomingMsg){
    digitalWrite(ledPin0, HIGH);
    myservo.write(179);
  }
  else{
    digitalWrite(ledPin0, LOW);
    delay(500);
    myservo.write(0);
  }
  //Reads the value of the potentiometer (value between 0 and 1023)
  incomingMsg = map(incomingMsg, 0, 1, 0, 179);     // scale it to use it with the servo (value between 0 and 180)
  Serial.print("Incoming Message: " + incomingMsg);

  //Reads the value of the potentiometer (value between 0 and 1023)
      // scale it to use it with the servo (value between 0 and 180)
  
  myservo.write(incomingMsg);                  // sets the servo position according to the scaled value
      
}
