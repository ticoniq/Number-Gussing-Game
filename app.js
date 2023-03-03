

// Game values 
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Element 
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI Min and Max 
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener 
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(e){
  // Get Input value 
  let guess = parseInt(guessInput.value);

  // Validate 
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'green');
  }

  // Check if won 
  if(guess === winningNum){
    // Game over WOn 
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  }else{
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Game over lost 
        gameOver(false, `Game over you lost. The correct number was ${winningNum}`);
        
      } else {
        // Change border color
        guessInput.style.border = '2px solid red';

        // clear the inputfield 
        guessInput.value = '';

        // Set message 
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
  }
}); 

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Dissable the input 
  guessInput.disabled = true;

  // Change border color
  guessInput.style.border = `2px solid ${color}`;

  // change text color 
  message.style.color = color;

  // Set message 
  setMessage(msg);
  
  guessBtn.value = 'Play Again';

  // Add className 
  guessBtn.className += 'play-again';

}

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
