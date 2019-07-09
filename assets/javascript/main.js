// word array

var wordOptions = ["titleist", "ping", "mizuno", "callaway", "footjoy", "taylormade", "srixon", "cleveland", "nike", "cobra", "bridgestone", "addidas", "odyssey", "ashworth"]

//variables
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var wordToGuess = [];
var wrongLetters = [];

// game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//function for randomly picking word from list
function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split('');
    numBlanks = lettersinWord.length;

    // reset
    guessesLeft = 9;
    wrongLetters = [];
    wordToGuess = [];

    // populate spaces for wordsToGuess with proper number of blanks
    for (var i = 0; i < numBlanks; i++) {

        wordToGuess.push("_");
    }

    document.getElementById("wordToGuess").innerHTML = wordToGuess.join(" ");

    document.getElementById("numGuesses").innerHTML = guessesLeft;

    document.getElementById("winCounter").innerHTML = winCount;

    document.getElementById("lossCounter").innerHTML = lossCount;

}
// add sound for correct letter in word.
var correctSound = document.createElement("audio")
correctSound.setAttribute("src", "assets/audio/clap.wav")

function checkLetters(letter) {
    // check if letter is in word
    var isLetterInWord = false;


    // check if guessed letter is in word.
    for (var i = 0; i < numBlanks; i++) {

        if (selectedWord[i] == letter) {
            isLetterInWord = true;

        }
    }
    // check where in the word the  letter exists, then populate our blanks and successes array.
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                wordToGuess[i] = letter;
                correctSound.play()
            }
        }
    }
    // letter isnt found
    else {
        wrongLetters.push(letter);
        guessesLeft--;
        // startGame();
    }
    
 }

function roundComplete() {
    // update information to html
    document.getElementById("numGuesses").innerHTML = guessesLeft;

    document.getElementById("wordToGuess").innerHTML = wordToGuess.join(" ");

    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    // check if user won
    if (lettersinWord.toString() == wordToGuess.toString()) {
        winCount++;
        
        // update win counter html
        document.getElementById("winCounter").innerHTML = winCount;
        setTimeout(startGame, 3000);
        // startGame();
    }

    // check if user lost
    else if (guessesLeft === 0) {
        lossCount++;
        
        // update html losses
        document.getElementById("lossCounter").innerHTML = lossCount;
        
        setTimeout(startGame, 2000);
        startGame();
    }
}

startGame();

// register key clicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
}