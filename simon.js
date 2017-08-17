//TODO - random series of button presses
//Each time user enters all correctly, add another to the series

//Hear sound (based on color) on correct press
//Notified of incorrect press & restart thee sequence again

//Display current number of steps

//Restart button

//Strict mode:
//-On fail, notify player and restart at 1 with new sequence

//Win at 20 presses
var Simon = {}
Simon.SOUNDS = Object.freeze({
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
})

Simon.playSound = function(sound) {
  this.SOUNDS[sound].play();
}
