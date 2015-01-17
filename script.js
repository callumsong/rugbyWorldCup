var allBlacks, eagles, time, possessions, winner;
function Team(name, offense, defense) { //user-defined fields
  this.name = name;
  this.offense = offense;
  this.defense = defense;
  this.points = [0];
}
Team.prototype.totalPoints = 0;
Team.prototype.myBallAbility = 0;
Team.prototype.addPoints = function(anArray){
  this.totalPoints = 0;
  for (var i = 0; i < anArray.length; i++){
    this.totalPoints += anArray[i];
  }
  return this.totalPoints;
};
RugbyMatch = function(){
  this.teams = [];
};
RugbyMatch.prototype.announcement = "no score yet";
RugbyMatch.prototype.time = 80;
RugbyMatch.prototype.possessions = 20;
RugbyMatch.prototype.winner = "nobody";
RugbyMatch.prototype.possessionCalculate = function(chosenTeam, myBallAbility){
  chosenTeam.myBallAbility = myBallAbility;
  this.possessionArrow = Math.floor((Math.random() * 2 + chosenTeam.myBallAbility));
  return this.possessionArrow;
};
RugbyMatch.prototype.addTeam = function (oneTeam) {
  this.teams.push(oneTeam);
};
RugbyMatch.prototype.scoreType = function() {
  var pointsChance = Math.round(Math.random() * 10);
  var convertChance = Math.round(Math.random() * 10);
  if (pointsChance <= 3) {
    if (convertChance <=5) {
      this.teams[this.possessionArrow].points.push(7); //this is a return value of true when convert is activated
      this.msg = this.teams[this.possessionArrow].name + " scored 7 points by a converted try";
    }
    else {
      this.teams[this.possessionArrow].points.push(5);
      this.msg = this.teams[this.possessionArrow].name + " scored 5 points by an unconverted try";
    }
  }
  else if (pointsChance <= 5) {
    this.teams[this.possessionArrow].points.push(3);
    this.msg = this.teams[this.possessionArrow].name + " scored 3 points by a penalty";
  }
  else if (pointsChance <= 7) {
    this.teams[this.possessionArrow].points.push(3);
    this.msg = this.teams[this.possessionArrow].name + " scored 3 points by a penalty";
  }
  else {
    this.teams[this.possessionArrow].points.push(0);
    this.msg = this.teams[this.possessionArrow].name + " denied by the defense";
  }
};
RugbyMatch.prototype.calculateWinner = function() {
  var scoreDifference = this.teams[0].totalPoints - this.teams[1].totalPoints;
  if (scoreDifference === 0) {
    this.winner = " ";
  }
  else if (scoreDifference > 0) {
    this.winner = this.teams[0].name;
  }
  else if (scoreDifference < 0) {
    this.winner = this.teams[1].name;
  }
};
RugbyMatch.prototype.announcement = "The Game has started! </br>";
var myRugbyMatch = new RugbyMatch();
var submitMyThis = document.getElementById("submitThis");
submitMyThis.addEventListener("click", playMyMatch, false);
function playMyMatch(){
  myRugbyMatch.announcement = "The Game has started! </br>";
  teamA = new Team(document.getElementById("TeamA").value, document.getElementById("Team A Offense").value, document.getElementById("Team A Defense").value);
  teamB = new Team(document.getElementById("TeamB").value, document.getElementById("Team B Offense").value, document.getElementById("Team B Defense").value);
  myRugbyMatch.addTeam(teamA);
  myRugbyMatch.addTeam(teamB);
  myRugbyMatch.teams[0].points = [];
  myRugbyMatch.teams[1].points = [];
  myRugbyMatch.teams[0].myBallAbility = (myRugbyMatch.teams[0].offense - myRugbyMatch.teams[1].defense) * 0.05;
  for(var i = 1; i <= myRugbyMatch.possessions; i++){
    myRugbyMatch.possessionCalculate(myRugbyMatch.teams[0], myRugbyMatch.teams[0].myBallAbility);
    console.log(myRugbyMatch.teams[0].myBallAbility);
    myRugbyMatch.scoreType();
    myRugbyMatch.teams[0].addPoints(myRugbyMatch.teams[0].points);
    myRugbyMatch.teams[1].addPoints(myRugbyMatch.teams[1].points);
    myRugbyMatch.calculateWinner();
    myRugbyMatch.announcement += (myRugbyMatch.msg + " at " + i*4 + " minute(s), score is " + myRugbyMatch.teams[0].totalPoints + "-" + myRugbyMatch.teams[1].totalPoints + " " + myRugbyMatch.winner + "</br>");
  }
  var el = document.getElementById("MyResults");
  el.innerHTML = "<p>" + myRugbyMatch.announcement + "</p>";
  var botEl = document.getElementById("FinaleResults");
  botEl.innerHTML = "<p>The Final Score is " + myRugbyMatch.teams[0].totalPoints + " - " + myRugbyMatch.teams[1].totalPoints + " " + myRugbyMatch.winner + "</p>";
}