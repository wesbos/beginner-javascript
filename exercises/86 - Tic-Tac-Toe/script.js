$(function() {
  var turn = 1;
  var winner = "";

  $(".item").click(function(){
    var bg = $(this).css("background-image");

    if(bg == "none" || bg == ""){
      var fig = "url(" + turn.toString() + ".png)";

      $(this).css("background", fig);
      $(this).addClass("element");

      turn = (turn == 1 ? 2 : 1);

      CheckGameOver();
    }
  });
});

function equalItens(a, b, c){
  var itemA = $("#item" + a);
  var itemB = $("#item" + b);
  var itemC = $("#item" + c);

  var bgA = $("#item" + a).css("background-image");
  var bgB = $("#item" + b).css("background-image");
  var bgC = $("#item" + c).css("background-image");

  if((bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")){
    if(bgA.indexOf("1.png") >= 0){
      winner = "1";
    }else{
      winner = "2";
    }

    return true;
  }else{
    return false;
  }
}

function CheckGameOver() {
  if(
    equalItens(1, 2, 3) || equalItens(4, 5, 6) || equalItens(7, 8, 9) ||
    equalItens(1, 4, 7) || equalItens(2, 5, 8) || equalItens(3, 6, 9) ||
    equalItens(1, 5, 9) || equalItens(3, 5, 7)
  ){
    $("#result").html("<h1>Player " + winner + " won! </h1>");
    $(".item").off("click");
  }
}
