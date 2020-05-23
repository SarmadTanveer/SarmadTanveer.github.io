/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, prevRoll, maxScore;

gameInit();

//btn is not called by us, but another function, in this case the event listener, btn is callback function
//document.querySelector('.btn-roll').addEventListener('click',btn);
//Anonymous function
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var twoRolls = prevRoll === 6 && dice === 6;
    //display the image
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //update the round score iff the rolled number is not a 1
    if (dice !== 1 && !twoRolls) {
      //Add to round score
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
      prevRoll = dice;
    } else if (twoRolls) {
      document.getElementById("score-" + activePlayer).textContent = 0;
      scores[activePlayer] = 0;
      nextPlayer();
    } else {
      //next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //Add current score to global score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //if player won the game
    if (scores[activePlayer] >= maxScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  prevRoll = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", gameInit);

function gameInit() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  prevRoll = 0;

  document.querySelector(".dice").style.display = "none";
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  maxScore = Number(prompt("Please enter a max score."));
}
