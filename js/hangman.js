const letters = "abcdefghijklmnopqrstuvwxyz1234567890+";

//set wrong attempts
let wrongAttempts = 0,
    rightAttempts = 0,
    spaceFlag = 0;

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter => {

  //create a span to put the letter in it
  let span = document.createElement("span");

  //create text inside the span which is a letter
  let spanLetter = document.createTextNode(letter);

  //put the span letter inside the span
  span.appendChild(spanLetter);

  //give the span a class
  span.className = "letter-box";

  //put the span inside the lettersContainer
  lettersContainer.appendChild(span);

});

const words = {
  programming: ["python", "c++", "javascript", "java", "php", "mysql", "go", "r", "fortran"],
  movies: ["prestige", "inception", "parasite", "intersteller", "titanic", "whiplash", "coco", "up", "accountant", "klaus", "home", "marrowbone", "extraction", "zodiac", "commuter", "us"],
  celebrity: ["abdullah nasser", "jackie chan", "christian bale", "tom cruise", "alexander", "cleopatra", "einstein", "ghandi", "adrian brody", "scarlett johansen"],
  countries: ["egypt", "yemen", "syria", "russia", "palestine", "bahrain", "saudi arabia", "korea", "turkey", "germany", "france", "italy"]
}

/* generate random property */

let allKeys = Object.keys(words);

//random index of category
let randCatIndex = Math.floor(Math.random() * allKeys.length);

//value of random index of category
let randCatValue = allKeys[randCatIndex];

//put randomly generated category inside the span of categories
let categorySpan = document.querySelector(".game-info .category span");
categorySpan.innerHTML = randCatValue;

//get the array of words inside each category
let catWords = words[randCatValue];

//generate random index for a word
let randWordIndex = Math.floor(Math.random() * catWords.length);

//get the value of randomly generated index for a word
let randWordValue = catWords[randWordIndex];
console.log(randWordValue);

//get the letter guess container
let letterGuessContainer = document.querySelector(".letters-guess");

//convert randomly generated word to an array of letters
let lettersAndSpace = Array.from(randWordValue);
console.log(lettersAndSpace.length);

//create a number of spans that depends on the number of letters in the word
lettersAndSpace.forEach(letter => {

  //create an empty span
  let emptySpan = document.createElement("span");

  //if letter is space
  if(letter === ' ') {
    //add class to the empty span
    emptySpan.className = "space";
  }

  //append the empty span to letterGuessContainer
  letterGuessContainer.appendChild(emptySpan);

});

//select the guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

guessSpans.forEach((span, i) => {
  if(span.classList.contains('space')){
    spaceFlag++;
  }
});
rightAttempts+=spaceFlag;

//grab the draw element
let draw = document.querySelector(".hangman-draw");

//handle click event on letters
document.addEventListener('click', (e) => {
  if(e.target.className === 'letter-box') {

    //set selection status
    let status = false;

    e.target.classList.add('clicked');

    //get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    //console.log(clickedLetter);

    //the chosen word
    let chosenWord = Array.from(randWordValue.toLowerCase());

    chosenWord.forEach((wordLetter, wordIndex) => {
      //if the clicked letter equal to one of the chosen word letters
      if(clickedLetter == wordLetter) {

        status = true;

        //loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {

          if(wordIndex == spanIndex) {
            span.innerHTML = clickedLetter;
            rightAttempts++;
console.log(rightAttempts);
          }
        });
      }
    });
    //outside the loop
    //if the selected letter is wrong
    if(status == false) {
      wrongAttempts++;
      draw.classList.add(`wrong-${wrongAttempts}`);
    }
    if(rightAttempts === lettersAndSpace.length) {
      swal({
        title: "WOW!",
        text: "peace of cake, huh?",
        icon: "success",
        buttons: "Play again?",
      })
      .then((value) => {
        if(value) {
          window.location.reload(true);
        } else {
          window.location.reload(true);
        }
      });
    }

    if(wrongAttempts == 8) {
      swal({
        title: `You failed! the word is ${randWordValue}`,
        text: "Click Restart to play again",
        icon: "warning",
        buttons: "Restart",
      })
      .then((willRestart) => {
        if(willRestart) {
          window.location.reload(true);
        } else {
          window.location.reload(true);
        }
      });
    }
  }
});

var lastSpan =  function(array, n) {
  if (array == null)
    return void 0;
  if (n == null)
     return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
  };
