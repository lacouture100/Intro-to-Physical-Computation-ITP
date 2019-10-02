const int buttonPin0 = 2;
const int ledPin0 =  3;
const int buttonPin1 = 4;
const int ledPin1 = 5;
const int buttonPin2 = 6;
const int ledPin2 =  7;
const int ledPin3 = 8;

int buttonState0 = 0;
int buttonState1 = 0;
int buttonState2 = 0;

int yellowButtonState;
int redButtonState;
int blueButtonState;

int totalButtonValue = 0;

void setup() {
  Serial.print(‘starting’);

  pinMode(ledPin0, OUTPUT);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);

  pinMode(buttonPin0, INPUT);
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);

}

void loop() {

  buttonState0 = digitalRead(buttonPin0);
  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);

  if (buttonState0 == HIGH && buttonState1 == LOW && buttonState2 == LOW ) {
    digitalWrite(ledPin0, HIGH);
    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, LOW);
    totalButtonValue = 1;
  }
  else if(buttonState0 == LOW && buttonState1 == HIGH && buttonState2 == LOW ) {
      digitalWrite(ledPin0, LOW);
      digitalWrite(ledPin1, HIGH);
      digitalWrite(ledPin2, LOW);
      totalButtonValue = 2;
  }
  else if(buttonState0 == LOW && buttonState1 == LOW && buttonState2 == HIGH ) {
      digitalWrite(ledPin0, LOW);
      digitalWrite(ledPin1, LOW);
      digitalWrite(ledPin2, HIGH);
      totalButtonValue = 3;
    }
  else if (buttonState0 == HIGH && buttonState1 == HIGH && buttonState2 == HIGH ) {
    digitalWrite(ledPin0, HIGH);
    digitalWrite(ledPin1, HIGH);
    digitalWrite(ledPin2, HIGH);
    totalButtonValue = 4;
  else if (buttonState0 == HIGH && buttonState1 == HIGH && buttonState2 == LOW ) {
    digitalWrite(ledPin0, HIGH);
    digitalWrite(ledPin1, HIGH);
    digitalWrite(ledPin2, LOW);
    totalButtonValue = 5;
  }
  else if (buttonState0 == LOW && buttonState1 == HIGH && buttonState2 == HIGH ) {
    digitalWrite(ledPin0, LOW);
    digitalWrite(ledPin1, HIGH);
    digitalWrite(ledPin2, HIGH);
    totalButtonValue = 6;
  }
  else if (buttonState0 == HIGH && buttonState1 == LOW && buttonState2 == HIGH ) {
    digitalWrite(ledPin0, HIGH);
    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, HIGH);
    totalButtonValue = 7;
  }
  else {
    digitalWrite(ledPin0, LOW);
    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, LOW);
    totalButtonValue = 0;
  }
  Serial.write(totalButtonValue);
  Serial.print(totalButtonValue);


}
