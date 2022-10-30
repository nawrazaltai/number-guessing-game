const guessBtn = document.querySelector('button');
guessBtn.addEventListener('click', guess);

let guessTitle = document.querySelector('.prev-guess-title');
guessTitle.classList.add('hide');

const maxGuesses = 5;
let guesses = 0;
let counter = document.querySelector('p');
counter.innerHTML = maxGuesses - guesses;

function generateNum() {
    winningNum = Math.floor(Math.random() * 100);
    return winningNum;
}

generateNum();

function guess() {
    let inputField = document.getElementById('input-field').value;
    inputField = parseInt(inputField);

    let response = document.querySelector('.too-high-low');
    response.classList.remove('correct-answer');

    let prevEl = document.querySelector('.prev-answer-list');

    let tooHigh = inputField + ' - too high' + '<br>';
    let tooLow =  inputField + ' - too low' + '<br>';

    let modal_container = document.getElementById('modal-container')
    let modal = document.querySelector('.modal');

    let modalHeader = document.querySelector('.modal-header')
    let modalText = document.querySelector('.modal-text');
    const playAgainBtn = document.querySelector('.play-again');
    playAgainBtn.addEventListener('click', playAgainFunc);

    function playAgainFunc (){
       modal_container.classList.remove('show');
       modal.classList.toggle('win-modal');
       modal.classList.toggle('lose-modal');
       guesses = 0;
       counter.innerHTML = maxGuesses - guesses;
       window.location.reload();
    }

    // Show winning num in console
    console.log(winningNum);

    if (guesses != 4) {
        if (inputField === winningNum) {
            // console.log('Congrats, winning num was: ',winningNum);
            // guesses = 0;
            console.log('Restarting game');
            modalHeader.innerHTML = ('Congratulations!');
            modalText.innerHTML = 'You guessed the correct number. <br> The winning number was: ' + winningNum; 
            modal.classList.remove('modal-lose');
            response.classList.remove('wrong-answer');
            prevEl.innerHTML = '';
            response.innerHTML = '';
            modal_container.classList.add('show');
            modal.classList.add('modal-win');
            guessTitle.classList.add('hide');
            inputField.value = '';
            generateNum();

        } else if (inputField > winningNum) {
            guesses = guesses + 1;
            response.classList.add('wrong-answer');
            response.innerHTML= 'Wrong answer, ' + inputField + ' is too high!';
            prevEl.appendChild = tooHigh;
            prevEl.innerHTML = prevEl.innerHTML + tooHigh;
            guessTitle.classList.remove('hide');

        } else if (inputField < winningNum) {
            guesses = guesses + 1;
            response.classList.add('wrong-answer')
            response.innerHTML = 'Wrong answer, ' + inputField + ' is too low!';
            prevEl.appendChild = tooLow;
            prevEl.innerHTML = prevEl.innerHTML + tooLow;
            guessTitle.classList.remove('hide');
        }

    } else if (guesses === 4 && inputField != winningNum) {
            guesses = guesses + 1;
            prevEl.appendChild = prevEl.innerHTML;
            modal_container.classList.add('show');
            modal.classList.add('modal-lose');
            modalHeader.innerHTML = ('GAME OVER!');
            modalText.innerHTML = 'You did not guess the correct number. <br> The winning number was: ' + winningNum;
            response.classList.remove('wrong-answer')
            response.innerHTML = '';
            guessTitle.classList.add('hide');
            prevEl.innerHTML = '';
            generateNum();
            // guesses = 0;
    } else {
            modal_container.classList.add('show');
            modal.classList.remove('modal-lose');
            modal.classList.add('modal-win');
            modalHeader.innerHTML = ('Congratulations!');
            modalText.innerHTML = 'You guessed the correct number. <br> The winning number was: ' + winningNum; 
            response.classList.remove('wrong-answer');
            guessTitle.classList.add('hide');
            response.innerHTML = '';
            prevEl.innerHTML = '';
            generateNum();
            // guesses= 0;
    }
    counter.innerHTML = maxGuesses - guesses;
}