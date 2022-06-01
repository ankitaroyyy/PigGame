'use strict';

let randomNumber = Math.trunc(Math.random() * 6 + 1);
const newGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const score = document.querySelectorAll('.score');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const diceButton = document.querySelector('.btn--roll');
const currentScore = document.querySelectorAll('.current-score');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const holdButton = document.querySelector('.btn--hold');
let currentPlayer = 'Player1';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let playing = true;
let winner;
const startNewGame = function () {
  dice.style.display = 'none';
  currentPlayer = 'Player1';
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = '0';
    currentScore[i].textContent = '0';
  }

  document
    .querySelector(`.player--${winner}`)
    .classList.remove('player--winner');
  console.log(document.querySelector(`.player--${winner}`).classList);

  console.log(document.querySelector(`.player--0`).classList);

  console.log(document.querySelector(`.player--1`).classList);

  if (winner === '0') {
    document.querySelector(`.player--0`).classList.add('player--active');

    document.querySelector(`.player--1`).classList.remove('player--active');
  } else {
    document.querySelector(`.player--1`).classList.remove('player--active');

    document.querySelector(`.player--0`).classList.add('player--active');
  }

  document.querySelector(`#name--0`).textContent = `Player 1`;

  document.querySelector(`#name--1`).textContent = `Player 2`;

  playing = true;
};
const checkWinner = function (winnerScore) {
  console.log(`.player--${winnerScore}`);
  if (
    Number(document.querySelector(`#score--${winnerScore}`).textContent) >= 100
  ) {
    playing = false;
    document
      .querySelector(`.player--${winnerScore}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${winnerScore}`)
      .classList.remove('player--active');

    document.querySelector(`#name--${winnerScore}`).textContent = `Player ${
      Number(winnerScore) + 1
    } Wins.. 💥💥💥`;
    dice.style.display = 'none';

    winner = winnerScore;

    console.log(typeof winnerScore);
    if (!Number(winnerScore)) {
      document.querySelector(`#name--1`).textContent = `Player 2 Losses..👎`;
    } else {
      document.querySelector(`#name--0`).textContent = `Player 1 Losses..👎`;
    }
    dice.style.display = 'hidden';
    // resetGame();
  }
};

const resetGame = function () {
  document.addEventListener('click', startNewGame);
};
const toggleShade = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
const rollingDicePlayer1 = function () {
  let diceOutcome = rollingDiceImg();
  if (diceOutcome !== 1) {
    currentScorePlayer1.textContent =
      Number(currentScorePlayer1.textContent) + diceOutcome;
  } else if (diceOutcome === 1) {
    currentScorePlayer1.textContent = '0';

    currentPlayer = 'Player2';
    toggleShade();
  }
};

const rollingDicePlayer2 = function () {
  let diceOutcome = rollingDiceImg();
  if (diceOutcome !== 1) {
    currentScorePlayer2.textContent =
      Number(currentScorePlayer2.textContent) + diceOutcome;
  } else if (diceOutcome === 1) {
    currentScorePlayer2.textContent = '0';
    currentPlayer = 'Player1';
    toggleShade();
  }
};

const rollingDiceImg = function () {
  randomNumber = Math.trunc(Math.random() * 6 + 1);
  let img = 'dice-' + randomNumber + '.png';
  dice.setAttribute('src', img);
  dice.style.display = 'block';
  return randomNumber;
};
const rollingDice = function () {
  if (playing) {
    //role dice for the specific player depending on the condition
    if (currentPlayer === 'Player1') {
      rollingDicePlayer1();
    } else if (currentPlayer === 'Player2') {
      rollingDicePlayer2();
    }
  }
};

const holdButtonClick = function () {
  if (playing) {
    if (currentPlayer === 'Player1') {
      scorePlayer1.textContent =
        Number(currentScorePlayer1.textContent) +
        Number(scorePlayer1.textContent);
      currentScorePlayer1.textContent = '0';
      checkWinner('0');
      currentPlayer = 'Player2';
      toggleShade();
    } else if (currentPlayer === 'Player2') {
      scorePlayer2.textContent =
        Number(currentScorePlayer2.textContent) +
        Number(scorePlayer2.textContent);
      checkWinner('1');
      currentScorePlayer2.textContent = '0';
      currentPlayer = 'Player1';
      toggleShade();
    }
  }
};

holdButton.addEventListener('click', holdButtonClick);

newGame.addEventListener('click', startNewGame);

diceButton.addEventListener('click', rollingDice);
