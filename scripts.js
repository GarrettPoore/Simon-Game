$(document).ready(function() {
  $(".color_button").click(function(event){
    var color = event.target.id;
    console.log(color + " pressed");
  });

  $("#restart").click(function(){
    console.log("Restart clicked");
  });

  $("#strict").click(function(){
    console.log("Strict mode toggled");
  });
});
