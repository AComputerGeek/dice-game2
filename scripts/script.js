// @author: Amir Armion
// @version: V.01

'use strict';

// All Buttons
const btnNew  = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Players
const p1 = document.querySelector(".player--0");
const p2 = document.querySelector(".player--1");

// Final Score Elements
let p1FinalScore = document.querySelector("#score--0");
let p2FinalScore = document.querySelector("#score--1");

// Current Score Elements
let p1CurrentScore = document.querySelector("#current--0");
let p2CurrentScore = document.querySelector("#current--1");

// Dice image
let diceImg = document.querySelector(".dice");

// Score limitation
let MAX_SCORE = 100;
let MIN_SCORE = 0;

// Set up the Final Score and Current Score to zero
p1FinalScore.innerHTML   = MIN_SCORE;
p2FinalScore.innerHTML   = MIN_SCORE;
p1CurrentScore.innerHTML = MIN_SCORE;
p2CurrentScore.innerHTML = MIN_SCORE;

// Hiding a dice image in the beginning
diceImg.classList.add("hidden");

// Roll Event
btnRoll.addEventListener("click", function(event) {

    // Creating a random number between 1 and 6
    let currentRoll = Math.round(Math.random() * 5) + 1;

    diceImg.classList.remove("hidden");
    diceImg.setAttribute("src", `./images/dice-${currentRoll}.png`);

    if(p1.classList.contains("player--active"))
    {
        if(currentRoll !== 1)
        {
            p1CurrentScore.innerHTML = Number(p1CurrentScore.innerHTML) + currentRoll;               
        }
        else
        {
            p1CurrentScore.innerHTML = MIN_SCORE;

            p1.classList.toggle("player--active");
            p2.classList.toggle("player--active");
        }
    }
    else
    {
        if(currentRoll !== 1)
        {
            p2CurrentScore.innerHTML = Number(p2CurrentScore.innerHTML) + currentRoll;          
        }
        else
        {
            p2CurrentScore.innerHTML = MIN_SCORE;

            p1.classList.toggle("player--active");
            p2.classList.toggle("player--active");
        }
    }
});


// Hold Event
btnHold.addEventListener("click", function(event) {

    diceImg.classList.add("hidden");

    if(p1.classList.contains("player--active"))
    {
        p1FinalScore.innerHTML   = Number(p1FinalScore.innerHTML) + Number(p1CurrentScore.innerHTML);
        p1CurrentScore.innerHTML = MIN_SCORE;
    }
    else
    {
        p2FinalScore.innerHTML   = Number(p2FinalScore.innerHTML) + Number(p2CurrentScore.innerHTML);
        p2CurrentScore.innerHTML = MIN_SCORE;
    }

    if(Number(p1FinalScore.innerHTML) >= MAX_SCORE || Number(p2FinalScore.innerHTML) >= MAX_SCORE)
    {
        btnRoll.disabled = true;
        btnHold.disabled = true;

        (Number(p1FinalScore.innerHTML) >= MAX_SCORE) ? p1.classList.add("winner") : p2.classList.add("winner");
    }
    else
    {
        p1.classList.toggle("player--active");
        p2.classList.toggle("player--active");
    }
});


// New Game Event
btnNew.addEventListener("click", function(event) {

    diceImg.classList.add("hidden");
    diceImg.setAttribute("src", `./images/dice-1.png`);

    p1FinalScore.innerHTML = MIN_SCORE;
    p2FinalScore.innerHTML = MIN_SCORE;

    p1CurrentScore.innerHTML = MIN_SCORE;
    p2CurrentScore.innerHTML = MIN_SCORE;

    btnRoll.disabled = false;
    btnHold.disabled = false;

    p1.classList.remove("winner");
    p2.classList.remove("winner");

    p1.classList.add("player--active");
    p2.classList.remove("player--active");
});
