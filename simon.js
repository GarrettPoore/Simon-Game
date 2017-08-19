//TODO - random series of button presses
//Each time user enters all correctly, add another to the series

//Hear sound (based on color) on correct press
//Notified of incorrect press & restart thee sequence again

//Display current number of steps

//Restart button

//Strict mode:
//-On fail, notify player and restart at 1 with new sequence

//Win at 20 presses

//TODO - add failed sound
SOUNDS = Object.freeze({
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
})

COLORS = ["green", "red", "yellow", "blue"];

var Simon = initSimon();

function initSimon() {
  var s = {};
  s.round = 0;
  s.sequence = [];
  s.playerCorrect = 0;
  s.pause = false;
  s.strict = false;
  return s;
}

function resetGame() {
  Simon = initSimon();
  addRound();
}

function addRound() {
  var index = Math.floor(Math.random() * 4)
  Simon.round += 1;
  Simon.sequence.push(COLORS[index]);
  Simon.playerCorrect = 0;
}

function startPlayingSequence() {
  console.log(Simon.sequence);
  Simon.pause = true;
  playSequenceFromIndex(0);
}

function playSequenceFromIndex(index) {
  if (index < Simon.sequence.length) {
    var color = Simon.sequence[index];
    playSound(color);
    blinkSpace(color, function(){
      setTimeout(playSequenceFromIndex, 400, index + 1);
    });
  } else {
    Simon.pause = false;
  }
}

function blinkSpace(color, func) {
  $("#" + color).fadeTo(300, 0.6, function() {
    $("#" + color).fadeTo(300, 1, function() {
      if (func != undefined) {
        func();
      }
    });
  });
}

function playSound(sound) {
  this.SOUNDS[sound].play();
}

function onPressedColor(color) {
  if (Simon.sequence[Simon.playerCorrect] == color) {
    //Success
    console.log("Successful color choice");
    playSound(color);
    blinkSpace(color);
    Simon.playerCorrect += 1;
    if (Simon.playerCorrect == Simon.sequence.length) {
      console.log("End of round");
      addRound();
      setTimeout(startPlayingSequence, 2000);
    }
  } else {
    //Failed
    //TODO - this is currently strict restart, needs reworked
    console.log("Failed color choice");
    // playSound("failed");
    blinkSpace(color);
    resetGame();
    setTimeout(startPlayingSequence, 1000);
  }
}
