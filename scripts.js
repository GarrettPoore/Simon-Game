$(document).ready(function() {
  resizeGame();

  $(".color_button").click(function(event){
    if (!Simon.pause) {
      var color = event.target.id;
      onPressedColor(color);
    }
  });

  $("#start").click(function(){
    addRound();
    startPlayingSequence();

    $("#start").hide();
    $("#restart").show();
  });

  $("#restart").click(function(){
    resetGame();
    startPlayingSequence();
  });

  $("#strict").click(function(event){
    Simon.strict = this.checked;
  });

  $(window).resize(function(){
    resizeGame();
  });
});

function resizeGame() {
  var largestSq = Math.min(window.innerWidth, window.innerHeight);
  var suggestedSize = largestSq - 35;
  var newSize = Math.max(400, suggestedSize);
  $("body").get(0).style.setProperty("--game_size", newSize + "px");
}
