$(document).ready(function() {
  resizeGame();

  $(".color_button").click(function(event){
    if (!Simon.pause) {
      var color = event.target.id;
      console.log(color + " pressed");
      onPressedColor(color);
    }
  });

  $("#start").click(function(){
    addRound();
    startPlayingSequence();

    //TODO - transition
    $("#start").hide();
    $("#restart").show();
  });

  $("#restart").click(function(){
    resetGame();
    startPlayingSequence();
    console.log("Restart clicked");
  });

  $("#strict").click(function(event){
    console.log(this.checked);
    Simon.strict = this.checked;
  });

  $(window).resize(function(){
    resizeGame();
  });
});

function resizeGame() {
  var width = window.innerWidth;
  console.log(width);
  if (width < 625) {
    var newWidth = Math.max(450, width - 25)
    $("body").get(0).style.setProperty("--game_size", newWidth + "px");
  } else {
    var size = window.getComputedStyle(document.body).getPropertyValue("--game_size");
    if (size != 600) {
      $("body").get(0).style.setProperty("--game_size", "600px");
    }
  }
}
