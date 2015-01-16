var allBlacks, eagles, time, possessions, winner;
function Team(name, offense, defense) { //user-defined fields
  this.name = name;
  this.offense = offense;
  this.defense = defense;
  this.points = [];
  this.totalPoints = 0;
  this.msg = "no score yet";
  this.myBallAbility = 0;
}

Team.prototype.scoreType = function() {
  var pointsChance = Math.round(Math.random() * 10);
  var convertChance = Math.round(Math.random() * 10);
  if (pointsChance <= 3) {
    if (convertChance <=5) {
      this.points.push(7); //this is a return value of true when convert is activated
      this.msg = "scored 7 points by a converted try";
    }
    else {
      this.points.push(5);
      this.msg = "scored 5 points by an unconverted try";
    }
  }
  else if (pointsChance <= 5) {
    this.points.push(3);
    this.msg = "scored 3 points by a penalty";
  }
  else if (pointsChance <= 7) {
    this.points.push(3);
    this.msg = "scored 3 points by a penalty";
  }
  else {
    //call possession and determine team for score assignment
    this.points.push(0);
    this.msg = "denied by the defense";
  }
};
Team.prototype.addPoints = function(anArray){
  this.totalPoints = 0;
  for (var i = 0; i < anArray.length; i++){
    this.totalPoints += anArray[i];
  }
  return this.totalPoints;
};
var submitMyThis = document.getElementById("submitThis");
submitMyThis.addEventListener("click", addNewAllBlack, false);

  function addNewAllBlack(){
allBlacks = new Team(document.getElementById("TeamA").value, document.getElementById("Team A Offense").value, document.getElementById("Team A Defense").value);
console.log(allBlacks.name);
eagles = new Team(document.getElementById("TeamB").value, document.getElementById("Team B Offense").value, document.getElementById("Team B Defense").value);
eagles.myBallAbility = (eagles.offense - allBlacks.defense)*0.5;
allBlacks.myBallAbility = (allBlacks.offense - eagles.defense)*0.5;
time = 80;
possessions = 20;
winner = "nobody";
function calculateWinner (){
  var scoreDifference = eagles.totalPoints - allBlacks.totalPoints;
  if (scoreDifference === 0){
    winner = " ";
  }
  else if (scoreDifference > 0){
    winner = eagles.name;
  }
  else{
    winner = allBlacks.name;
  }
}
function playGame() {
  var msg = "The Game has started! </br>";
  for(var i = 1; i <= possessions; i++){
  var teams = Math.random() * 10;
  if (teams <= 5 + eagles.myBallAbility) {
    eagles.scoreType();
    eagles.addPoints(eagles.points);
    calculateWinner();
    msg += (eagles.name + " " + eagles.msg + " at " + i*4 + " minute(s), score is " + eagles.totalPoints + "-" + allBlacks.totalPoints + " " + winner + "</br>");
  }
  else {
    allBlacks.scoreType();
    allBlacks.addPoints(allBlacks.points);
    calculateWinner();
    msg += (allBlacks.name + " " + allBlacks.msg + " at " + i*4 + " minute(s), score is " + eagles.totalPoints + "-" + allBlacks.totalPoints + " " + winner + "</br>");
  }
  var el = document.getElementById("MyResults");
  el.innerHTML = "<p>" + msg + "</p>";
  }
}
playGame();
}