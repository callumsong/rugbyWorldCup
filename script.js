function Team(name, offense, defense) { //user-defined fields
          this.name = name;
          this.offense = offense;
          this.defense = defense;
          this.points = [];
        }
        var allBlacks = new Team("All Blacks", 7, 8);
        var eagles = new Team("Eagles", 4, 4);
        var time = 80;
        var possessions = 20;

        Team.prototype.scoreType = function() {
          var pointsChance = Math.round(Math.random() * 10);
          var convertChance = Math.round(Math.random() * 10);
          if (pointsChance <= 3) {
            if (convertChance <=5) {
              this.points.push(7); //this is a return value of true when convert is activated
            }
            else {
              this.points.push(5);
            }
          }
          else if (pointsChance <= 5) {
            this.points.push(3);
          }
          else if (pointsChance <= 7) {
            this.points.push(3);
          }
          else {
            //call possession and determine team for score assignment
            this.points.push(0);
          }
        };
        function Game() { // run upon user clicking submit button
          function hasBall() { //determine which team has the ball
            var teams = Math.random() * 10;
            if (teams <= 5) {
              return allBlacks;
            }
            else {
              return eagles;  
            }
            console.log(hasBall);
          })();
          function playGame() { 
            if (hasBall == eagles) {
              eagles.scoreType();
              console.log(eagles.points);
            }
            else {
              allBlacks.scoreType();
              console.log(allBlacks.points);
            }
          }
          playGame();
        }
        Game();