const cards = document.getElementsByClassName("front");
const cardsArr = [].slice.call(cards);
const images = document.getElementsByClassName("back");
const imagesArr = [].slice.call(images);

let firstTurn = true;
let card1Class = ""
let card2Class = ""

cardsArr.forEach((element) => {
  element.addEventListener("click", flipCard);
});

function flipCard(event) {
  event.target.style.display = "none";
  imagesArr[cardsArr.indexOf(event.target)].style.display = "block";

  if (firstTurn == true) {
    card1Class = `${imagesArr[cardsArr.indexOf(event.target)].className}`
    cardOneImg = imagesArr[cardsArr.indexOf(event.target)]
    frontofCard1 = event.target
    firstTurn = false;
    return;
  } else if (firstTurn == false) {
    card2Class = `${imagesArr[cardsArr.indexOf(event.target)].className}`
    cardTwoImg = imagesArr[cardsArr.indexOf(event.target)]
    frontofCard2 = event.target
    checkPair(card1Class, card2Class);
  }
}

function checkPair (x, y) {
        console.log(x)
        console.log(y)
        if (x == y) {
          console.log("pair")
      } else {
          console.log("not a pair")
      }
}
