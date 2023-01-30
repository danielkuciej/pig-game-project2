'use strict';

//Elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnBewGame = document.querySelector('.btn--new');

//Starting conditions
let scores, currentScore, activePlayer, playing;

const initialization = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    //Reset scores
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    //Hidden dice
    dice.classList.add('hidden');

    //Removing player--winner class
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    
    //Add active--player class
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

}
initialization();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = currentScore

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

//Roll dice functionality
btnRollDice.addEventListener('click', function() {
    if(playing) {
        //Generate random number
        const randomNumber = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        dice.classList.remove('hidden');
        dice.src = `Dice img/dice-${randomNumber}.png`;

        //Check for rolled 1 (if true -> switch to next player)
        if(randomNumber === 1) {
            currentScore = 0;
            switchPlayer()
        } else {
            //Add dice to the current score
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        };
    };
});

//Hold button functionality
btnHold.addEventListener('click', function() {
    if(playing) {
        // Add current score to the active player score
        scores[activePlayer] += currentScore;
        currentScore = 0;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if player's score >= 100
        if(scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
        };

        //Switch to the next player
        switchPlayer()
    };
});

//New Game button functionality
btnBewGame.addEventListener('click', function() {
    initialization();
});