var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var userClickedPattern = [];
var isStarted = false;
var level = 0;
var userPatternIndex = -1;
function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColours[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  userPatternIndex =-1;
  userClickedPattern.length=0;

}
$(".btn").click(function(){
  if (isStarted === true){
  var userChosenColor = $(this).attr("id");
  userPatternIndex++;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern[userPatternIndex]);
}
});
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  },  100);
}
$(document).keypress(function(event){
console.log(event.key);

if (isStarted == false)
{
$("h1").text("Level 0")
nextSequence();
isStarted = true;
}
}
);
function checkAnswer(lastAnswer){
  if (userClickedPattern.length === gamePattern.length)
  {
    console.log("Your last answer was " + lastAnswer + " and the last pattern is " + gamePattern[gamePattern.length-1]);
    if (lastAnswer === gamePattern[gamePattern.length-1]){
      console.log("success");
      setTimeout(function (){nextSequence()
      }, 1000);
    }
    else
    {
    gameOver();
    }
  }

  else if (userClickedPattern.length < gamePattern.length)
  {
    console.log("Your last answer was " + lastAnswer + " and the pattern at that position was " + gamePattern[userPatternIndex]);
    if (lastAnswer === gamePattern[userPatternIndex])
    {
      console.log("right so far, keep going...")
    }
    else
    {
      gameOver();
    }
  }
  }
  function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over")}, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    isStarted = false;
    level = 0;
    userPatternIndex = -1;
    gamePattern.length = 0;
    userClickedPattern.length=0;
  }
