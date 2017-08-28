COLORS = ["green", "red", "yellow", "blue"];

SOUNDS = Object.freeze({
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  failed: getFailedSound()
})

function getFailedSound() {
  var audio = new Audio("https://www.soundjay.com/button/button-10.mp3")
  audio.volume = 0.05;
  return audio;
}

function playSound(sound) {
  this.SOUNDS[sound].play();
}

var Simon = initSimon();

function initSimon() {
  var s = {};
  s.round = 0;
  s.sequence = [];
  s.playerCorrect = 0;
  s.pause = true;
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
  $("#round").text(Simon.round);
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

/*
* Creates & returns a function that will randomly blink a color and play the
* respective sound X number of times
*/
function makeWinningBlinks(max, num) {
  var color = COLORS[Math.floor(Math.random() * 4)];
  if (num == undefined) {num = 1;}

  if (num == max) {
    return function() {
      playSound(color);
      blinkSpace(color);
    }
  } else {
    return function() {
      playSound(color);
      blinkSpace(color, makeWinningBlinks(max, num+1));
    }
  }
}

function winGame() {
  var blinks = 20;
  var flashSpaces = makeWinningBlinks(blinks);
  flashSpaces();

  $("#round").text("WIN!");
  setTimeout(resetGame, blinks*650);
  setTimeout(startPlayingSequence, (blinks+1)*650);
}

function onPressedColor(color) {
  if (Simon.sequence[Simon.playerCorrect] == color) {
    //Success
    playSound(color);
    blinkSpace(color);
    Simon.playerCorrect += 1;

    //The last color was pressed
    if (Simon.playerCorrect == Simon.sequence.length) {
      Simon.pause = true;
      if (Simon.playerCorrect == 20) {
        //Winner!
        winGame();
      } else {
        addRound();
        setTimeout(startPlayingSequence, 2000);
      }
    }
  } else {
    //Failed
    playSound("failed");
    blinkSpace(color);

    if (Simon.strict) {
      resetGame();
      setTimeout(startPlayingSequence, 1000);
    } else {
      Simon.playerCorrect = 0;
      setTimeout(startPlayingSequence, 1000);
    }
  }
}
