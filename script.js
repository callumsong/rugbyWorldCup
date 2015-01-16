var allBlacks, eagles, time, possessions, winner;
function Team(name, offense, defense) { //user-defined fields
  this.name = name;
  this.offense = offense;
  this.defense = defense;
  this.points = [];
  this.totalPoints = 0;
  this.msg = "no score yet";
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
allBlacks = new Team("All Blacks", 7, 8);
eagles = new Team("Eagles", 4, 4);
time = 80;
possessions = 20;
winner = "nobody";
function calculateWinner (){
  var scoreDifference = eagles.totalPoints - allBlacks.totalPoints;
  if (scoreDifference === 0){
    winner = " ";
  }
  else if (scoreDifference > 0){
    winner = "Eagles";
  }
  else{
    winner = "All Blacks";
  }
}
function playGame() {
  for(var i = 1; i <= possessions; i++){
  var teams = Math.random() * 10;
  if (teams <= 5) {
    eagles.scoreType();
    eagles.addPoints(eagles.points);
    calculateWinner();
    console.log ("Eagles " + eagles.msg + " at " + i*4 + " minute(s), score is " + eagles.totalPoints + "-" + allBlacks.totalPoints + " " + winner);
  }
  else {
    allBlacks.scoreType();
    allBlacks.addPoints(allBlacks.points);
    calculateWinner();
    console.log ("All Blacks " + allBlacks.msg + " at " + i*4 + " minute(s), score is " + eagles.totalPoints + "-" + allBlacks.totalPoints + " " + winner);
  }
  }
}
playGame();
allBlacks.addPoints(allBlacks.points);
eagles.addPoints(eagles.points);
console.log(eagles.points);
console.log(allBlacks.points);
console.log(allBlacks.totalPoints);
console.log(eagles.totalPoints);