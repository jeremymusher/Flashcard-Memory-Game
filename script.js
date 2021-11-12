const front = document.getElementsByClassName("front");
const frontArr = [].slice.call(front);
const images = document.getElementsByClassName("back");
const imagesArr = [].slice.call(images);

const deck = document.querySelector(".deck");

const cards = deck.children;
const newDiv = document.createDocumentFragment();

const shuffleButton = document.querySelector(".reshuffle")
const playAgainButton = document.querySelector("#play-again")
const correct = document.querySelector("#numCorrect")
const numAttempts = document.querySelector("#numAttempts")
const winText = document.querySelector(".win-text")
const winScreen = document.querySelector(".win-screen")

let firstTurn = true;
let card1Class = "";
let card2Class = "";
let frontofCard1 = null;
let frontofCard2 = null;
let cardOneImg = null;
let cardTwoImg = null;

let pairsFound = 0;
let attempts = 0;


function position() {
  return Math.floor(Math.random() * cards.length);
}

function reshuffle() {
  frontArr.forEach((element) => element.style.display = "block") 
  imagesArr.forEach((element) => element.style.display = "none") 
  while (cards.length > 0) {
    newDiv.appendChild(cards[position()]);
  }
  deck.appendChild(newDiv);
  pairsFound = 0;
  attempts = 0;
  correct.innerText = `${pairsFound}`
  numAttempts.innerText = `${attempts}`
  winScreen.style.display = "none"
}

reshuffle();


shuffleButton.addEventListener("click", reshuffle)
playAgainButton.addEventListener("click", reshuffle)

function applyEvent() {
  frontArr.forEach((element) => {
    element.addEventListener("click", flipCard);
  });
}

applyEvent();

function flipCard(event) {
  event.target.style.display = "none";
  imagesArr[frontArr.indexOf(event.target)].style.display = "block";

  if (firstTurn == true) {
    card1Class = `${imagesArr[frontArr.indexOf(event.target)].className}`;
    cardOneImg = imagesArr[frontArr.indexOf(event.target)];
    frontofCard1 = event.target;
    firstTurn = false;
  } else if (firstTurn == false) {
    card2Class = `${imagesArr[frontArr.indexOf(event.target)].className}`;
    cardTwoImg = imagesArr[frontArr.indexOf(event.target)];
    frontofCard2 = event.target;
    checkPair(card1Class, card2Class);
    firstTurn = true;
  }
}
function triggerWin(){
    winText.innerText =`Congratulations! You Found All 10 Pairs Using Only ${attempts} Attempts. Try Again To See If You Can Do Better`
    winScreen.style.display = "block"
}

function checkPair(x, y) {
  frontArr.forEach((element) => {
    element.removeEventListener("click", flipCard);
  });

  setTimeout(function () {
    if (x == y) {
      console.log("pair found");
      pairsFound += 1;
      attempts += 1;
      correct.innerHTML=`${pairsFound}`
      numAttempts.innerHTML=`${attempts}`
      applyEvent();
      if (pairsFound == 10){
          triggerWin();
      }
    } else {
      console.log("not a pair");
      frontofCard1.style.display = "block";
      frontofCard2.style.display = "block";
      cardOneImg.style.display = "none";
      cardTwoImg.style.display = "none";
      attempts += 1;
      numAttempts.innerHTML=`${attempts}`
      applyEvent();
    }
  }, 750);
}
