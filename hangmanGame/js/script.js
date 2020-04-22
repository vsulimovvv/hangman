const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const playAgainBtn = document.getElementById('play-again');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// случайное слово
let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter =>`
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>`
      )
      .join('')}
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulayions! You won!';
    popup.style.display = 'flex';
  }
}

// update the wrong letter
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You lost';
    popup.style.display = 'flex';
  }
}

// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//  Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = '';
});

displayWord();