$(document).ready(function() {
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
});
