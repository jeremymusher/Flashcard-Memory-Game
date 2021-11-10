const front = document.getElementsByClassName("front");
const frontArr = [].slice.call(front);
const images = document.getElementsByClassName("back");
const imagesArr = [].slice.call(images);

const deck = document.querySelector(".deck");

const cards = deck.children;
const newDiv = document.createDocumentFragment();

const shuffleButton = document.querySelector("#reshuffle")
const correct = document.querySelector("#numCorrect")

let firstTurn = true;
let card1Class = "";
let card2Class = "";
let frontofCard1 = null;
let frontofCard2 = null;
let cardOneImg = null;
let cardTwoImg = null;

let pairsFound = 0;


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
  correct.innerHTML=`${pairsFound}`


}

reshuffle();

shuffleButton.addEventListener("click", reshuffle)

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

function checkPair(x, y) {
  frontArr.forEach((element) => {
    element.removeEventListener("click", flipCard);
  });

  setTimeout(function () {
    if (x == y) {
      console.log("pair found");
      pairsFound += 1;
      correct.innerHTML=`${pairsFound}`
      applyEvent();
    } else {
      console.log("not a pair");
      frontofCard1.style.display = "block";
      frontofCard2.style.display = "block";
      cardOneImg.style.display = "none";
      cardTwoImg.style.display = "none";
      applyEvent();
    }
  }, 750);
}
